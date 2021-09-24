class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.string :name
      t.string :description
      t.decimal :amount

      t.timestamps
    end
  end
end
