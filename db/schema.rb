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

ActiveRecord::Schema.define(version: 20140716215737) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "book_product_information", force: true do |t|
    t.string  "title"
    t.string  "author"
    t.string  "price"
    t.string  "shipping_weight"
    t.string  "isbn10"
    t.integer "shipping_boxes_id"
  end

  add_index "book_product_information", ["shipping_boxes_id"], name: "index_book_product_information_on_shipping_boxes_id", using: :btree

  create_table "shipping_boxes", force: true do |t|
    t.float "total_weight", default: 0.0
  end

  add_index "shipping_boxes", ["total_weight"], name: "index_shipping_boxes_on_total_weight", using: :btree

end
