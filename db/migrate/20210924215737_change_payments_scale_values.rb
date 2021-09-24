class ChangePaymentsScaleValues < ActiveRecord::Migration[6.1]
  def change
    change_column :payments, :amount, :decimal, :default => 0.0, :precision => 20, :scale => 2
  end
end
