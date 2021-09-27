class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :amount, :date

  def date
    self.object.created_at.to_s
  end
end
