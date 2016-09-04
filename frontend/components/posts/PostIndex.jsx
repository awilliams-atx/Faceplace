var React = require('react'),
    UI = require('../../util/ui'),
    Util = require('../../util/general'),
    PostForm = require('./PostForm'),
    PostIndexItem = require('./PostIndexItem'),
    ClientActions = require('../../actions/client_actions'),
    PostStore = require('../../stores/post'),
    SessionStore = require('../../stores/session'),
    UserStore = require('../../stores/user');

var PostIndex = React.createClass({
  getInitialState: function () {
    return ({ posts: PostStore.all() });
  },
  render: function () {
    return (
      <section className='group' id='post-index'>
        {this.renderForm()}
        {this.renderPosts()}
      </section>
    );
  },
  renderForm: function () {
    if (this.authorizedToPost()) {
      return <PostForm isEditing={false} // profileOwnerId undefined on <Main/>
        profileOwnerId={this.props.profileOwnerId}/>;
    }
  },
  renderPosts: function () {
    return this.state.posts.map(function (post) {
      return <PostIndexItem key={post.postId} post={post} />;
    });
  },
  componentDidMount: function () {
    this.postListener = PostStore.addListener(this.onPostStoreChange);
  },
  componentDidUpdate: function () {
    if (this.props.profileOwnerid) {
      setTimeout(function () { UI.scrollToPost() }, 1000);
    }
  },
  componentWillUnmount: function () {
    this.postListener.remove();
  },
  authorizedToPost: function () {
    if (!this.props.profileOwnerId) { return true }
    if (UserStore.user().isFriendOfCurrentUser ||
      this.props.profileOwnerId === SessionStore.currentUser().id) {
      return true;
    }
    return false;
  },
  onPostStoreChange: function () {
    this.setState({ posts: PostStore.all() });
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({ posts: PostStore.all() });
  }
});

module.exports = PostIndex;
