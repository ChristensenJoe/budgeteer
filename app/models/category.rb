class Category < ApplicationRecord
  belongs_to :user
  has_many :category_payments, dependent: :destroy
  has_many :payments, through: :category_payments, dependent: :destroy
end
