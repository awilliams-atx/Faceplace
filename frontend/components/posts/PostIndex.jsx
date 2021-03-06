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
    return ({
      authorizedToPost: false,
      posts: PostStore.all(),
      profileOwner: UserStore.user() // empty object on <Main/>
    });
  },
  render: function () {
    return (
      <section className='group'
        id='post-index'
        style={{width: this.sectionWidth()}}>
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
    // User listener for #authorizedToPost
    this.sessionListener = SessionStore.addListener(this.onSessionStoreChange);
    this.userListener = UserStore.addListener(this.onUserStoreChange);
    window.addEventListener('scroll', this.loadListener);
  },
  componentDidUpdate: function () {
    // Post was mounted on prev. page
    setTimeout(UI.scrollToPost, 1000);
  },
  componentWillUnmount: function () {
    this.postListener.remove();
    this.sessionListener.remove();
    this.userListener.remove();
    UI.set('fetchingMorePosts', false);
    window.removeEventListener('scroll', this.loadListener);
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({ posts: PostStore.all() });
  },
  authorizedToPost: function () {
    if (!this.props.profileOwnerId) { return true }
    return SessionStore.authorizedToPostOnTimeline(UserStore.user().userId);
  },
  checkNoMorePosts: function (id) {
    if (id !== undefined && this.state.posts.length > 0) {
      var newLastPostId = this.state.posts[this.state.posts.length - 1].postId;
      if (id !== newLastPostId) {
        UI.set('fetchingMorePosts', false);
      }
    }
  },
  loadListener: function () {
    if (document.body.scrollHeight - window.innerHeight <
      window.scrollY + 100) {
    }
    if (!UI.now('fetchingMorePosts') && !this.state.nomore && document.body
    .scrollHeight - window.innerHeight < window.scrollY + 100) {
      UI.set('fetchingMorePosts', true); // NB: Also takes care of not fetching when no more posts to fetch.
      ClientActions
        .fetchMorePosts(this.props.profileOwnerId, this.state.posts.length);
    }
  },
  onPostStoreChange: function () {
    if (this.state.posts.length > 0) {
      var lastPostId = this.state.posts[this.state.posts.length - 1].postId;
    }
    this.setState({ posts: PostStore.all() }, function () {
      this.checkNoMorePosts(lastPostId);
    }.bind(this));
  },
  onSessionStoreChange: function () {
    this.setState({ authorizedToPost: this.authorizedToPost() });
  },
  onUserStoreChange: function () {
    this.setState({ profileOwner: UserStore.user() });
  },
  sectionWidth: function () {
    if (window.location.pathname.match('/users/')) {
      return '510px';
    } else {
      return '502px';
    }
  }
});

module.exports = PostIndex;
