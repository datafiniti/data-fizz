# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150610040141) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string   "title",                                   null: false
    t.string   "author"
    t.decimal  "price",           precision: 8, scale: 2
    t.decimal  "shipping_weight", precision: 8, scale: 2
    t.string   "isbn_10"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
  end

  add_index "books", ["shipping_weight"], name: "index_books_on_shipping_weight", using: :btree

  create_table "box_items", force: :cascade do |t|
    t.integer  "box_id",     null: false
    t.integer  "book_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "box_items", ["book_id"], name: "index_box_items_on_book_id", using: :btree
  add_index "box_items", ["box_id"], name: "index_box_items_on_box_id", using: :btree

  create_table "boxes", force: :cascade do |t|
    t.decimal  "capacity",   precision: 6, scale: 2, default: 10.0
    t.datetime "created_at",                                        null: false
    t.datetime "updated_at",                                        null: false
  end

end
