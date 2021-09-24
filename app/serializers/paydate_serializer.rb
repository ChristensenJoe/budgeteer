class PaydateSerializer < ActiveModel::Serializer
  attributes :paydate
  has_one :paycheck
end
