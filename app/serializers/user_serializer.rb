class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email

  has_one :paycheck
end
