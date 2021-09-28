class UpdateUsersUnallocatedBalancePrecision < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :unallocated_balance, :decimal, :default => 0.0, :precision => 200, :scale => 2
  end
end
