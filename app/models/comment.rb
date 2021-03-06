class Comment < ActiveRecord::Base
  attr_accessor :notifications
  validates :commentable_id, :commentable_type, presence: true

  after_create :add_watching, :make_notifications
  # Leaving notification after deleting comment
  after_destroy :remove_watching

  belongs_to :author, class_name: 'User'
  belongs_to :commentable, polymorphic: true
  has_many :notifications, as: :notifiable, dependent: :destroy

  private

  def add_watching
    Watching.find_or_create_by(watchable_type: 'Post', watchable_id:
      commentable_id, watcher_id: author_id)
  end

  def make_notifications
    self.notifications = []
    commentable.watchers.each do |user|
      next if author == user
      notification = Notification.create!(notifiable_type: 'Comment',
        notifiable_id: id, notifier_id: author.id, notified_id: user.id, notifier_name: author.full_name)
      self.notifications << notification
    end
  end

  def remove_watching
    watching = Watching.find_by(watchable_type: 'Post', watchable_id:
      commentable_id, watcher_id: author_id)
    watching.destroy if watching
  end
end
