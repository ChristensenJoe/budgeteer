class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name
      t.decimal :balance
      t.decimal :percentage

      t.timestamps
    end
  end
end
