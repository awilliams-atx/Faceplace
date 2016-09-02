var ServerActions = require('../actions/server_actions');

var FriendRequestApiUtil = {
  acceptFriendRequest: function (acceptance, uiAccept) {
    $.ajax({
      url: '/api/friend_request/accept',
      method: 'PATCH',
      dataType: 'json',
      data: { accept: acceptance },
      success: function (acceptance) {
        ServerActions.receiveAcceptedFriendRequest(acceptance);
        uiAccept && uiAccept();
      }
    });
  },
  cancelRequest: function (cancellation) {
    $.ajax({
      url: '/api/friend_request',
      method: 'DELETE',
      dataType: 'json',
      data: { cancel: cancellation },
      success: function () {
        ServerActions.receiveFriendRequestCancelation();
      }
    });
  },
  fetchFriendRequests: function () {
    $.ajax({
      url: '/api/friend_requests',
      method: 'GET',
      dataType: 'json',
      success: function (friendRequests) {
        ServerActions.receiveFriendRequests(friendRequests);
      }
    });
  },
  makeFriendRequest: function (userId) {
    $.ajax({
      url: '/api/friend_requests',
      method: 'POST',
      dataType: 'json',
      data: { receiver_id: userId },
      success: function (friendRequest) {
        ServerActions.receiveMadeFriendRequest(friendRequest);
      }
    });
  },
  markRequestsChecked: function (checkedIds) {
    $.ajax({
      url: '/api/friend_requests/mark_checked',
      method: 'POST',
      dataType: 'json',
      data: { checked_ids : JSON.stringify(checkedIds) },
      success: function (checked_ids) {
        ServerActions.receiveCheckedRequestIds(checked_ids);
      }
    })
  },
  rejectFriendRequest: function (rejection) {
    // console.log('CHECK!');
    $.ajax({
      url: '/api/friend_request/reject',
      method: 'DELETE',
      dataType: 'json',
      data: { reject: rejection },
      success: function (rejection) {
        ServerActions.receiveRejectedFriendRequest(rejection);
      }
    })
  }
};

module.exports = FriendRequestApiUtil;
