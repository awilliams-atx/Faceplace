class Tagging < ActiveRecord::Base
  include Notifiable
  validates :tagged_id, :post_id, presence: true

  after_create :add_watching
  after_destroy :remove_watching

  belongs_to :post
  belongs_to :tagged, class_name: 'User', foreign_key: :tagged_id

  private

  def add_watching
    Watching.find_or_create_by!(watchable_type: 'Post', watchable_id: post_id,
      watcher_id: tagged_id)
  end

  def remove_watching
    watching = Watching.find_by(watchable_type: 'Post', watchable_id: post_id,
      watcher_id: tagged_id)
    watching.destroy if watching
  end
end
