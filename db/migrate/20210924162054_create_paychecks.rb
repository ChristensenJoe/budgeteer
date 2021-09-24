class CreatePaychecks < ActiveRecord::Migration[6.1]
  def change
    create_table :paychecks do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.decimal :amount

      t.timestamps
    end
  end
end
