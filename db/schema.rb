# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_10_05_155100) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.decimal "balance", default: "0.0"
    t.decimal "percentage", precision: 6, scale: 2, default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "position"
    t.index ["user_id"], name: "index_categories_on_user_id"
  end

  create_table "category_payments", force: :cascade do |t|
    t.bigint "category_id", null: false
    t.bigint "payment_id", null: false
    t.boolean "is_primary", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_category_payments_on_category_id"
    t.index ["payment_id"], name: "index_category_payments_on_payment_id"
  end

  create_table "paychecks", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "amount", precision: 200, scale: 2, default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_paychecks_on_user_id"
  end

  create_table "paydates", force: :cascade do |t|
    t.bigint "paycheck_id", null: false
    t.date "paydate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["paycheck_id"], name: "index_paydates_on_paycheck_id"
  end

  create_table "payments", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.decimal "amount", precision: 200, scale: 2, default: "0.0"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "unallocated_balance", precision: 200, scale: 2, default: "0.0"
    t.boolean "email_confirmed", default: false
    t.string "confirm_token"
  end

  add_foreign_key "categories", "users"
  add_foreign_key "category_payments", "categories"
  add_foreign_key "category_payments", "payments"
  add_foreign_key "paychecks", "users"
  add_foreign_key "paydates", "paychecks"
end
