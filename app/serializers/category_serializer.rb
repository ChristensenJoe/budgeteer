class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :balance, :percentage, :position
end
