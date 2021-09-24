class CreateCategoryPayments < ActiveRecord::Migration[6.1]
  def change
    create_table :category_payments do |t|
      t.belongs_to :category, null: false, foreign_key: true
      t.belongs_to :payment, null: false, foreign_key: true
      t.boolean :is_primary

      t.timestamps
    end
  end
end
