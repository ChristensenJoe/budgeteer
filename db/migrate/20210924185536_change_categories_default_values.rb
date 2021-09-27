class ChangeCategoriesDefaultValues < ActiveRecord::Migration[6.1]
  def change
    change_column :categories, :balance, :decimal, :default => 0.0
    change_column :categories, :percentage, :decimal, :default => 0.0
  end
end
