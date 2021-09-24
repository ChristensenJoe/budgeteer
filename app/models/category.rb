class Category < ApplicationRecord

  validates :name, presence: true, uniqueness: { scope: :user_id }

  belongs_to :user
  has_many :category_payments, dependent: :destroy
  has_many :payments, through: :category_payments, dependent: :destroy
end
