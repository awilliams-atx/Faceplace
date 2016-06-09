var React = require('react'),
    ProfileApiUtil = require('../../../../util/profile_api_util'),
    ProfileStore = require('../../../../stores/profile');

var IntroItemWork = React.createClass({
  getInitialState: function () {
    return ({
      editing: false,
      company: ProfileStore.company(),
      position: ProfileStore.position()
    });
  },
  render: function () {
    var workString = 'What do you do?';
    if (this.state.position && this.state.company) {
      workString = this.state.position + " at " + this.state.company;
    } else if (this.state.position) {
      workString = this.state.position;
    } else if (this.state.company) {
      workString = 'Works at ' + this.state.company;
    }
    if (this.state.editing) {
      return (
        <form onSubmit={this.handleSubmit}
              onBlur={this.onBlur}>
          <input value={this.state.position || ''}
            placeholder='What do you do?'
            onChange={this.onPositionChange}
            ref='autoFocus' />

          <input value={this.state.company || ''}
            placeholder='Where do you work?'
            onChange={this.onCompanyChange} />

          <div className='buttons'>
            <button>Submit</button>
            <button onClick={this.cancel}>Cancel</button>
          </div>
        </form>
      );
    } else {
      return (
        <div className='intro-item-text' onClick={this.showEdit}>
          <div>
            {workString}
          </div>
          <div className='editButton'></div>
        </div>
      );
    }
  },
  componentDidMount: function () {
    this.ProfileListener = ProfileStore.addListener(this.onProfileStoreChange);
  },
  componentWillUnmount: function () {
    this.ProfileListener.remove();
  },
  showEdit: function (e) {
    e.preventDefault();
    if (!this.props.authorizedToEdit) { return; }
    this.setState({
      editing: true
    }, function () {
      this.refs.autoFocus.focus();
    });
  },
  cancel: function (e) {
    e.preventDefault();
    this.setState({
      position: ProfileStore.position(),
      company: ProfileStore.company()
    }, this.toggleEdit);
  },
  toggleEdit: function () {
    this.setState({editing: !this.state.editing});
  },
  handleSubmit: function (e) {
    e.preventDefault();
    this.setState({
      editing: false
    });
    ProfileApiUtil.setProfile({
      company: this.state.company,
      position: this.state.position
    });
  },
  onPositionChange: function (e) {
    this.setState({position: e.target.value});
  },
  onCompanyChange: function (e) {
    this.setState({company: e.target.value});
  },
  onProfileStoreChange: function (e) {
    this.setState({
      position: ProfileStore.position(),
      company: ProfileStore.company()
    });
  }
});

module.exports = IntroItemWork;