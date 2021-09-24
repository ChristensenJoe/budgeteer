class ChangeCategoryPaymentsIsPrimaryDefault < ActiveRecord::Migration[6.1]
  def change
    change_column :category_payments, :is_primary, :boolean, :default => false
  end
end
