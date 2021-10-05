require "Date"

class User < ApplicationRecord
  has_secure_password
  before_create :confirmation_token
  validates :username, :email, :password_confirmation, presence: true, on: :create
  validates :username, :email, uniqueness: true

  has_many :categories, dependent: :destroy
  has_many :category_payments, through: :categories, dependent: :destroy
  has_many :payments, through: :category_payments, dependent: :destroy
  has_one :paycheck, dependent: :destroy
  has_many :paydates, through: :paycheck

  def set_up_first_user
    Paycheck.create!(user_id: self.id, amount: 2000)
    self.paycheck.paydates.create!(paydate: Date.parse("01"))
    self.paycheck.paydates.create!(paydate: Date.parse("15"))

    self.categories.create!(name: "Savings", percentage: 0.2, position: 1)
    self.categories.create!(name: "Spending", percentage: 0.1, position: 2)
  end

  def self.automated_paycheck
    self.all.each do |user|
      today = DateTime.now.day

      user.paydates.each do |paydate|
        current_date = paydate.paydate.day
        
        if today == current_date
          leftover_percentage = 1.0 - user.total_percentage
          new_unallocated_balance = user.unallocated_balance + (user.paycheck.amount * leftover_percentage)

          user.categories.each do |category|
            category_percentage = category.percentage
            category_balance = category.balance
            new_balance = category_balance + (user.paycheck.amount * category_percentage)
            category.update!(balance: new_balance)
          end

          user.update!(unallocated_balance: new_unallocated_balance)
        end
      end
    end
  end

  def total_percentage
    percentage = 0.0
    self.categories.each do |category|
      percentage += category.percentage
    end
    percentage
  end

  def email_activate
    self.email_confirmed = true
    self.confirm_token = nil
    save!(:validate => false)
  end

  private

  def confirmation_token
    if self.confirm_token.blank?
      self.confirm_token = SecureRandom.urlsafe_base64.to_s
    end
  end
end
