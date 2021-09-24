class CategoryPaymentSerializer < ActiveModel::Serializer
  attributes :id, :is_primary
  has_one :category
  has_one :payment
end
