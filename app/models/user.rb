class User < ApplicationRecord
    has_secure_password
    validates :username, :email, :password_confirmation, presence: true
    validates :username, :email, uniqueness: true

    has_many :categories, dependent: :destroy
    has_many :category_payments, through: :categories, dependent: :destroy
    has_many :payments, through: :category_payments, dependent: :destroy
    has_one :paycheck, dependent: :destroy
    has_many :paydates, through: :paycheck
end
