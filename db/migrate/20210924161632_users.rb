class Users < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :unallocated_balance, :decimal
  end
end
