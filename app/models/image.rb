class Image < ActiveRecord::Base
  # --------------------------------PAPERCLIP-------------------------------- #
  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  belongs_to :imageable, polymorphic: true
end
