var Dispatcher = require('../dispatcher/dispatcher'),
    friendshipConstants = require('../constants/friendship_constants'),
    friendRequestConstants = require('../constants/friend_request_constants'),
    modalConstants = require('../constants/modal_constants'),
    postConstants = require('../constants/post_constants'),
    tagConstants = require('../constants/tag_constants'),
    CommentApiUtil = require('../util/comment_api_util'),
    FriendApiUtil = require('../util/friend_api_util'),
    FriendshipApiUtil = require('../util/friendship_api_util'),
    FriendRequestApiUtil = require('../util/friend_request_api_util'),
    NotificationApiUtil = require('../util/notification_api_util'),
    PostApiUtil = require('../util/post_api_util'),
    SearchApiUtil = require('../util/search_api_util'),
    TagApiUtil = require('../util/tag_api_util'),
    UserApiUtil = require('../util/user_api_util'),
    CommentStore = require('../stores/comment'),
    SessionStore = require('../stores/session');

var ClientActions = {
  addTaggedFriend: function (userId) {
    Dispatcher.dispatch({
      actionType: tagConstants.FRIEND_TAGGED,
      userId: userId
    });
  },
  cancelFriendRequest: function (cancellation) {
    FriendRequestApiUtil.cancelRequest(cancellation);
  },
  cancelModal: function () {
    Dispatcher.dispatch({
      actionType: modalConstants.MODAL_CANCELED
    });
  },
  deletePost: function (postId) {
    PostApiUtil.deletePost(postId);
  },
  emptyJustCheckedIds: function () {
    Dispatcher.dispatch({
      actionType: friendRequestConstants.CHECKING_REQUESTS_NOW
    });
  },
  fetchComments: function (type, id) {
    CommentApiUtil.fetchComments(type, id);
  },
  fetchFriendRequests: function () {
    FriendRequestApiUtil.fetchFriendRequests();
  },
  fetchMostRecentlyAddedFriends: function (userId) {
    FriendApiUtil.fetchMostRecentlyAddedFriends(userId);
  },
  fetchNotifiableComment: function (notification) {
    // Only fetch if notifiable is on current page; navigating to another page fetches up-to-date notifiables by default.
    if (!CommentStore.exists(notification.post_id,
        notification.notifiable_id)) {
      CommentApiUtil.fetchSingleComment(notification);
    }
  },
  fetchNotifications: function (pagination) {
    NotificationApiUtil.fetchNotifications(pagination);
  },
  fetchSearchResults: function (searchString) {
    SearchApiUtil.fetchSearchResults(searchString);
  },
  fetchTaggedFriends: function (postId) {
    PostApiUtil.fetchTaggedFriends(postId);
  },
  fetchTagSearchResults: function (searchString) {
    TagApiUtil.fetchSearchResults(searchString);
  },
  fetchTimelinePosts: function (profileOwnerId) {
    PostApiUtil.fetchTimelinePosts(profileOwnerId);
  },
  fetchUser: function (id) {
    UserApiUtil.fetchUser(id);
  },
  freezeTags: function () {
    Dispatcher.dispatch({
      actionType: tagConstants.FREEZE_TAGS
    });
  },
  makeFriendRequest: function (userId) {
    FriendRequestApiUtil.makeFriendRequest(userId);
  },
  markRequestsChecked: function (checkedIds) {
    FriendRequestApiUtil.markRequestsChecked(checkedIds);
  },
  markNotificationRead: function (id) {
    NotificationApiUtil.markNotificationRead(id);
  },
  markNotificationsChecked: function (checkedIds) {
    NotificationApiUtil.markNotificationsChecked(checkedIds);
  },
  removeTaggedFriend: function (userId) {
    Dispatcher.dispatch({
      actionType: tagConstants.FRIEND_UNTAGGED,
      userId: userId
    });
  },
  respondToFriendRequest: function (response) {
    FriendRequestApiUtil.respondToFriendRequest(response);
  },
  submitComment: function (comment) {
    CommentApiUtil.submitComment(comment);
  },
  submitPost: function (post) {
    var submissionPost = {
      body: post.body,
      profile_owner_id: post.profileOwnerId,
      tagged_ids: post.taggedFriendIds
    };
    PostApiUtil.submitPost(submissionPost);
  },
  submitProfile: function (changes) {
    UserApiUtil.submitProfile(changes);
  },
  triggerModal: function (modalContent, cb) {
    Dispatcher.dispatch({
      actionType: modalConstants.MODAL_TRIGGERED,
      modalContent: modalContent
    });
  },
  unfreezeTags: function () {
    Dispatcher.dispatch({
      actionType: tagConstants.UNFREEZE_TAGS
    });
  },
  unfriend: function (userId) {
    FriendshipApiUtil.destroyFriendship(userId);
  },
  updatePost: function (post) {
    var submissionPost = {
      id: post.id,
      body: post.body,
      tagged_ids: post.taggedFriendIds
    };
    PostApiUtil.updatePost(submissionPost);
  }
};

module.exports = ClientActions;
