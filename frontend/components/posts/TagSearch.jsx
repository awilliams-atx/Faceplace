var React = require('react'),
    ClientActions = require('../../actions/client_actions'),
    TagApiUtil = require('../../util/tag_api_util'),
    TagStore = require('../../stores/tag');

var TagSearch = React.createClass({
  getInitialState: function () {
    return ({
      searchString: '',
      taggedFriends: TagStore.taggedFriends(),
      tagging: this.props.tagging,
      untaggedFriends: TagStore.untaggedFriends(),
      wasJustTagging: false
    });
  },
  render: function () {

    var taggedFriends;

    var taggedIds = Object.keys(this.state.taggedFriends);

    if (taggedIds.length > 0) {

      taggedFriends = (
        <div className='tagged-friends-list group'>
          <div className='tagged-friends-with'>{'— with '}</div>
          {
            taggedIds.map(function (id) {
              var friend = this.state.taggedFriends[id];

              return (
                <div className='tagged-friends-list-item'
                  data-userid={id}
                  key={id}
                  onClick={this.untagFriend}>
                  {friend.fullName}
                </div>
              );
            }.bind(this))
          }
        </div>
      );
    } else {
      taggedFriends = <div className='empty-tagged-friends' />;
    }

    var taggingField;

    if (this.state.tagging) {
      taggingField = (
        <div className='tagging-field-container'>
          <div className='tagging-field-with'>With:</div>
          <div className='tagging-field'>
            <input className='tagged-friends-input'
              placeholder='Who are you with?'
              onChange={this.onSearchStringChange}
              value={this.state.searchString}
              ref='autoFocus' />
          </div>
        </div>
      );
    } else {
      taggingField = <div className='emptyTaggingField' />;
    }

    var filteredFriends;

    if (this.state.tagging &&
        Object.keys(this.state.untaggedFriends).length > 0) {
      var untaggedFriends =
        Object.keys(this.state.untaggedFriends).map(function (id) {
        return this.state.untaggedFriends[id];
      }.bind(this));

      tagSearchItems = (
        <div className='tag-search-anchor-point'>
          <div className='tagging-friends-search-results overlay group'>
          {
            untaggedFriends.map(function (friend) {
              return (
                <div
                  className='tagging-friends-search-result group'
                  onClick={this.onTagFriend}
                  key={friend.userId}
                  data-userid={friend.userId} >
                  <img src={friend.postPicUrl} />
                  <strong>{friend.fullName}</strong>
                </div>
              );
            }.bind(this))
          }
          </div>
        </div>
      );
    } else {
      tagSearchItems = <div className='empty-tagged-friends-search-results'/>;
    }

    return (
      <div className='tagging-container group'>
        {taggedFriends}
        {taggingField}
        {tagSearchItems}
      </div>
    );
  },
  componentDidMount: function () {
    this.tagListener = TagStore.addListener(this.onTagStorechange);
  },
  componentWillUnmount: function () {
    this.tagListener.remove();
  },
  componentWillReceiveProps: function (props) {
    var wasJustTagging = this.state.tagging ? true : false;

    this.setState({
      tagging: props.tagging,
      wasJustTagging: wasJustTagging
    }, function () {
      if (!this.state.wasJustTagging && this.state.tagging) {
        this.refs.autoFocus.focus();
      }
    }.bind(this));
  },
  onSearchStringChange: function (e) {
    this.setState({searchString: e.target.value}, function () {
      ClientActions.fetchTagSearchResults(this.state.searchString);
    });
  },
  onTagStorechange: function () {
    this.setState({
      taggedFriends: TagStore.taggedFriends(),
      untaggedFriends: TagStore.untaggedFriends()
    }, function () {
      if (this.state.tagging) {
        this.refs.autoFocus.focus();
      }
    }.bind(this));
  },
  onTagFriend: function (e) {
    e.preventDefault();
    var friendId = parseInt(e.currentTarget.dataset.userid);

    // var taggedFriendIds = {};
    // taggedFriendIds[friendId] = true;
    // taggedFriendIds = $.extend(taggedFriendIds, this.state.taggedFriendIds);

    // var friends = $.extend({}, this.state.friends);
    // delete friends[friendId];

    this.setState({
      searchString: '',
      // friends: friends,
      // taggedFriendIds: taggedFriendIds
    }, function () {
      ClientActions.addTaggedFriend(friendId);
      this.refs.autoFocus.focus();
    }.bind(this));
  },
  untagFriend: function (e) {
    var friendId = parseInt(e.target.dataset.userid);

    // var taggedFriendIds = $.extend({}, this.state.taggedFriendIds);
    // delete taggedFriendIds[friendId];
    //
    // var friends = $.extend({}, this.state.friends);
    // friends[friendId] = TagStore.find(friendId);

    // this.setState({
      // taggedFriendIds: taggedFriendIds,
      // friends: friends
    // }, function () {
      ClientActions.removeTaggedFriend(friendId);
      if (this.state.tagging) {
        this.refs.autoFocus.focus();
      }
    // }.bind(this));
  }
});

module.exports = TagSearch;
