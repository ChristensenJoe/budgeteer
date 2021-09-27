class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :unallocated_balance

  has_one :paycheck
end
