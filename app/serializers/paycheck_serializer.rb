class PaycheckSerializer < ActiveModel::Serializer
  attributes :id, :amount
  has_one :user
  has_many :paydates
end
