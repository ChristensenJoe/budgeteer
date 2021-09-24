class CreatePaydates < ActiveRecord::Migration[6.1]
  def change
    create_table :paydates do |t|
      t.belongs_to :paycheck, null: false, foreign_key: true
      t.date :paydate

      t.timestamps
    end
  end
end
