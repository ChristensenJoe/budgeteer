class CategorySpecificsSerializer < ActiveModel::Serializer
  attributes :id, :name, :balance, :percentage
  has_many :payments
end
