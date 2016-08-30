var React = require('react'),
    IntroItemDescription = require('./IntroItemDescription'),
    PolyIntroItem = require('./PolyIntroItem');

var IntroIndex = React.createClass({
  render: function () {
    return (
      <section id='intro-index'
        className='profile-aside-item subcontent-container'>
        <img src={window.intro_icon} className='icon'/>
        <h2>Intro</h2>
        <div className='intro-line'>
          <IntroItemDescription
            authorizedToEdit={this.props.authorizedToEdit}
            user={this.props.user} />
        </div>
        <hr />
        <table>
          <tbody>
            {this.renderWork()}
            {this.renderEducation()}
            {this.renderLocation()}
            {this.renderHometown()}
          </tbody>
        </table>
      </section>
    );
  },
  renderWork: function () {
    if (SessionStore.currentUser().id !== this.props.user.userId && !this.props.user.position && !this.props.user.work) {
      return
    } else {
      return (
        <tr>
          <td className='intro-img' id='intro-work-img'></td>
          <td>
            <PolyIntroItem authorizedToEdit={this.props.authorizedToEdit}
              items={[{ name: 'position', placeholder: 'Position' },
                      { name: 'company', placeholder: 'Company'}]}
              toFormattedString={this.formatWork}
              user={this.props.user} />
          </td>
        </tr>
      );
    }
  },
  renderEducation: function () {
    if (SessionStore.currentUser().id !== this.props.user.userId && !this.props.user.major && !this.props.user.school) {
      return
    } else {
      return (
        <tr>
          <td className='intro-img' id='intro-school-img'></td>
          <td>
            <PolyIntroItem authorizedToEdit={this.props.authorizedToEdit}
              items={[{ name: 'major', placeholder: 'Major' },
                      { name: 'school', placeholder: 'School'}]}
              toFormattedString={this.formatSchool}
              user={this.props.user} />
          </td>
        </tr>
      );
    }
  },
  renderHometown: function () {
    if (SessionStore.currentUser().id !== this.props.user.userId && !this.props.user.major && !this.props.user.school) {
      return
    } else {
      return (
        <tr>
          <td className='intro-img' id='intro-hometown-img'></td>
          <td>
            <PolyIntroItem authorizedToEdit={this.props.authorizedToEdit}
              items={[{ name: 'hometown', placeholder: 'Hometown' }]} toFormattedString={this.formatHometown}
              user={this.props.user} />
          </td>
        </tr>
      );
    }
  },
  renderLocation: function () {
    if (SessionStore.currentUser().id !== this.props.user.userId && !this.props.user.major && !this.props.user.school) {
      return
    } else {
      return (
        <tr>
          <td className='intro-img' id='intro-location-img'></td>
          <td>
            <PolyIntroItem authorizedToEdit={this.props.authorizedToEdit}
              items={[{ name: 'location', placeholder: 'Location' }]} toFormattedString={this.formatLocation}
              user={this.props.user} />
          </td>
        </tr>
      );
    }
  },
  formatHometown: function (state) {
    if (state.hometown) {
      return state.hometown;
    } else {
      return 'Where are you from?';
    }
  },
  formatLocation: function (state) {
    if (state.location) {
      return state.location;
    } else {
      return 'Where do you live?';
    }
  },
  formatSchool: function (state) {
    if (state.major && state.school) {
      return state.major + ' at ' + state.school;
    } else if (state.major) {
      return state.major;
    } else if (state.school) {
      return state.school;
    } else {
      return 'What\'s your education?';
    }
  },
  formatWork: function (state) {
    if (state.position && state.company) {
      return state.position + ' at ' + state.company;
    } else if (state.position) {
      return state.position;
    } else if (state.company) {
      return state.company;
    } else {
      return 'Where do you work?';
    }
  }
});

module.exports = IntroIndex;
