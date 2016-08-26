var React = require('react');

var FriendIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  render: function () {
    return (
      <div className='friend-thumb'>
        <a href={'/users/' + this.props.friend.user_id}
          onClick={this.pushUserRoute}>
          <img src={this.props.friend.profile_pic_url}/>
          <div className='friend-thumb-name'>
            {this.props.friend.fullName}
          </div>
        </a>
      </div>
    );
  },
  pushUserRoute: function (e) {
    e.preventDefault();
    this.context.router.push('/users/' + this.props.friend.user_id);
  }
});

module.exports = FriendIndexItem;
