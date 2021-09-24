class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :balance, :percentage
  has_one :user
end
