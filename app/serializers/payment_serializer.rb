class PaymentSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :amount, :date, :primary_category

  def date
    self.object.created_at.to_s
  end

  def primary_category
    self.object.category_payments.find_by(is_primary: true).category.id
  end
end
