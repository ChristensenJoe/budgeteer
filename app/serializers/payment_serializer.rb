class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :amount
end
