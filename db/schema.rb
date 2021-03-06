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

ActiveRecord::Schema.define(version: 20160906205451) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_trgm"

  create_table "comments", force: :cascade do |t|
    t.text     "body"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "author_id",        null: false
  end

  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree

  create_table "friend_requests", force: :cascade do |t|
    t.integer  "maker_id",                           null: false
    t.integer  "receiver_id",                        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "checked",            default: false
    t.boolean  "accepted",           default: false
    t.boolean  "acceptance_checked", default: false
  end

  add_index "friend_requests", ["maker_id", "receiver_id"], name: "index_friend_requests_on_maker_id_and_receiver_id", unique: true, using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "friend_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "images", force: :cascade do |t|
    t.integer  "imageable_id",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "imageable_type",     null: false
  end

  create_table "notifications", force: :cascade do |t|
    t.integer  "notifiable_id",                     null: false
    t.string   "notifiable_type",                   null: false
    t.integer  "notified_id",                       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "notifier_id",                       null: false
    t.text     "explanation",                       null: false
    t.boolean  "checked",           default: false
    t.string   "notifier_name"
    t.integer  "timeline_owner_id",                 null: false
    t.integer  "post_id",                           null: false
    t.boolean  "read",              default: false
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "author_id",                    null: false
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "friends_only", default: false
    t.boolean  "global",       default: false
  end

  create_table "taggings", force: :cascade do |t|
    t.integer  "post_id",    null: false
    t.integer  "tagged_id",  null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "timeline_postings", force: :cascade do |t|
    t.integer  "profile_owner_id", null: false
    t.integer  "post_id",          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
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
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "facebook_uid"
  end

  create_table "watchings", force: :cascade do |t|
    t.integer "watchable_id",   null: false
    t.string  "watchable_type", null: false
    t.integer "watcher_id",     null: false
  end

  add_index "watchings", ["watchable_id", "watcher_id"], name: "index_watchings_on_watchable_id_and_watcher_id", unique: true, using: :btree

end
