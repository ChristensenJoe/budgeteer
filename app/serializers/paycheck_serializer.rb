class PaycheckSerializer < ActiveModel::Serializer
  attributes :id, :amount
  
  has_many :paydates
end
