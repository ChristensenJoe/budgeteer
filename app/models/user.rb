class User < ApplicationRecord
    has_secure_password
    validates :username, :email, :password_confirmation, presence: true
    validates :username, :email, uniqueness: true

    has_many :categories, dependent: :destroy
    has_one :paycheck, dependent: :destroy
    has_many :paydates, through: :paycheck
end
