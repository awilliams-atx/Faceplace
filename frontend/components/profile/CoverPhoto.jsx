var React = require('react'),
    EditButton = require('./EditPhotoButton'),
    SessionStore = require('../../stores/session');

var CoverPhoto = React.createClass({
  render: function () {
    return (
      <div id='cover-photo'>
        <img src={this.props.profileOwner.coverPhotoUrl} />
        <div id='cover-photo-name'>{this.name()}</div>
        <EditButton authorizedToEdit={this.authorizedToEdit()}
          updateUtil='submitCoverPhoto'
          formName='user[cover_photo]'
          photoType='cover-photo' />
      </div>
    );
  },
  authorizedToEdit: function () {
    return this.props.profileOwner.userId === SessionStore.currentUser().id;
  },
  name: function () {
    return this.props.profileOwner.firstName + ' ' +
      this.props.profileOwner.lastName;
  }
});


module.exports = CoverPhoto;
