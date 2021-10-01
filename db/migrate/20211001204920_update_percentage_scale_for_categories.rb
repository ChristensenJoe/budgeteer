class UpdatePercentageScaleForCategories < ActiveRecord::Migration[6.1]
  def change
    change_column :categories, :percentage, :decimal, :default => 0.0, :precision => 6, :scale => 2
  end
end
