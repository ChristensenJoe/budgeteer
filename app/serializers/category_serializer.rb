class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :balance, :percentage
end
