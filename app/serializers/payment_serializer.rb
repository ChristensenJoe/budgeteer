class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :amount, :date
  belongs_to :category

  def date
    self.object.created_at.to_s
  end
end
