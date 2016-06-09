class Post < ActiveRecord::Base
  validates :author_id, presence: true

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

  has_many :taggings, dependent: :destroy

  has_many :tagged_friends,
    through: :taggings,
    source: :tagged

  has_one :timeline_posting

  has_one :profile_owner,
    through: :timeline_posting,
    source: :profile_owner

  has_one :timeline_posting, dependent: :destroy
end