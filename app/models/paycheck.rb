class Paycheck < ApplicationRecord
  belongs_to :user
  has_many :paydates, dependent: :destroy
end
