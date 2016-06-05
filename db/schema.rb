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

ActiveRecord::Schema.define(version: 20160605161417) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "friend_requests", force: :cascade do |t|
    t.integer  "maker_id",    null: false
    t.integer  "receiver_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "friend_requests", ["maker_id", "receiver_id"], name: "index_friend_requests_on_maker_id_and_receiver_id", unique: true, using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer "user_id",   null: false
    t.integer "friend_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name",               null: false
    t.string   "last_name",                null: false
    t.string   "email",                    null: false
    t.string   "password_digest",          null: false
    t.string   "session_token",            null: false
    t.text     "description"
    t.string   "company"
    t.string   "position"
    t.string   "location"
    t.string   "hometown"
    t.string   "major"
    t.string   "school"
    t.string   "profile_pic_file_name"
    t.string   "profile_pic_content_type"
    t.integer  "profile_pic_file_size"
    t.datetime "profile_pic_updated_at"
    t.string   "cover_photo_file_name"
    t.string   "cover_photo_content_type"
    t.integer  "cover_photo_file_size"
    t.datetime "cover_photo_updated_at"
  end

end
