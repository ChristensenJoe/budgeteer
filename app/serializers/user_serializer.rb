class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :unallocated_balance, :total_balance

  has_one :paycheck

  def total_balance
    balance = self.object.unallocated_balance;
    self.object.categories.each do |category|
        balance += category.balance
    end
    balance
end
end
