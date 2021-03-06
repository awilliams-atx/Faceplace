var ServerActions = require('../actions/server_actions');

var TagApiUtil = {
  fetchFriendsForTagging: function (userId) {
    $.ajax({
      url: '/api/users/' + userId + '/friends_for_tagging',
      method: 'GET',
      dataType: 'json',
      success: function (friends) {
        ServerActions.receiveFriendsForTagging(friends);
      }
    });
  },
  fetchSearchResults: function (searchString) {
    $.ajax({
      url: '/api/users/search',
      method: 'GET',
      dataType: 'json',
      data: {
        search_string: searchString,
        friends_only: 'true'
      },
      success: function (searchResults) {
        ServerActions.receiveTagSearchResults(searchResults);
      }
    });
  }
};

module.exports = TagApiUtil;
