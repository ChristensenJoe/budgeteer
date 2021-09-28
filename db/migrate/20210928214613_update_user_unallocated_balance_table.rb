class UpdateUserUnallocatedBalanceTable < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :unallocated_balance, :decimal, :default => 0.0, :precision => 5, :scale => 2
  end
end
