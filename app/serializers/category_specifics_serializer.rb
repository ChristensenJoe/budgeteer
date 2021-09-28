class CategorySpecificsSerializer < ActiveModel::Serializer
  attributes :id, :name, :balance, :percentage
  has_many :payments do
    object.payments.order(created_at: :desc)
  end
end
