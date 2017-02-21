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

ActiveRecord::Schema.define(version: 20150618153045) do

  create_table "books", force: :cascade do |t|
    t.string   "title",           null: false
    t.string   "author",          null: false
    t.decimal  "price",           null: false
    t.decimal  "shipping_weight", null: false
    t.string   "isbn_10",         null: false
    t.integer  "box_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "books", ["box_id"], name: "index_books_on_box_id"

  create_table "boxes", force: :cascade do |t|
    t.decimal  "total_weight", default: 0.0, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

end
