class Payment < ApplicationRecord
    has_many :category_payments, dependent: :destroy
    has_many :categories, through: :category_payments
end
