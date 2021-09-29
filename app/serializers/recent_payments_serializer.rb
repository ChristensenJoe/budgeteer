class RecentPaymentsSerializer < ActiveModel::Serializer
  attributes :id, :name, :amount, :primary_category
  
  def primary_category
    self.object.category_payments.find_by(is_primary: true).category.name
  end
end
