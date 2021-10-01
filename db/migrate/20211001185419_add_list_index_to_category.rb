class AddListIndexToCategory < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :position, :integer
  end
end
