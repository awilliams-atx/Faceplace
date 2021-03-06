var React = require('react'),
    ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.browserHistory,
    Redirect = ReactRouter.Redirect,

    LogInForm = require('./components/LogInForm'),
    Main = require('./components/Main'),
    Nav = require('./components/nav/Nav'),
    Profile = require('./components/profile/Profile'),
    Timeline = require('./components/profile/timeline/Timeline'),

    ModalStore = require('./stores/modal'),
    SessionStore = require('./stores/session'),
    SessionApiUtil = require('./util/session_api_util');

var App = React.createClass({
  getInitialState: function () {
    return ({isModalDisplayed: ModalStore.isModalDisplayed()});
  },
  render: function () {
    var modal;

    if (this.state.isModalDisplayed) {
      modal = (
        <div id='modal-background' className='modal-background-opaque'>
          {ModalStore.modalContent()()}
        </div>
      );
    } else {
      modal =
        <div id='modal-background' className='modal-background-transparent' />;
    }

    return (
      <div id='app'>
        {modal}
        {this.renderNav()}
        {this.props.children}
      </div>
    );
  },
  renderNav: function () {
    if (!window.location.pathname.match('/login')) {
      return <Nav />;
    }
  },
  componentDidMount: function () {
    this.modalListener =
      ModalStore.addListener(this.onModalStoreChange);
  },
  componentWillUnmount: function () {
    this.modalListener.remove();
  },
  onModalStoreChange: function () {
    this.setState({
      isModalDisplayed: ModalStore.isModalDisplayed()
    }, function () {
      if (this.refs.autoFocus) { this.refs.autoFocus.focus(); }
    });
  }
});

var routes = (
  <Route path='/' component={ App } >
    <IndexRoute component={ Main } onEnter={ ensureLoggedIn } />
    <Route path='login' component={ LogInForm } onEnter={ ensureNotLoggedIn }/>
    <Route path='main' component={ Main } onEnter={ ensureLoggedIn } />
    <Route path='users/:userId' component={ Profile } onEnter={ ensureLoggedIn } >
      <IndexRoute component={ Timeline } />
      <Route path='timeline' component={ Timeline } />
    </Route>
  </Route>
);

function ensureLoggedIn (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn () {
    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }

    asyncDoneCallback();
  }
}

function ensureNotLoggedIn (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfLoggedIn);
  }

  function redirectIfLoggedIn () {
    if (SessionStore.isUserLoggedIn()) {
      replace('/');
    }

    asyncDoneCallback();
  }
}

function redirectToProfile (nextState, replace, asyncDoneCallback) {
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn () {
    if (SessionStore.isUserLoggedIn()) {
      replace('/users/' + SessionStore.currentUser().id);
    } else {
      replace('/login')
    }

    asyncDoneCallback();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('root');
  var router = <Router history={browserHistory} routes={routes} />;
  ReactDOM.render(router, root);
});
