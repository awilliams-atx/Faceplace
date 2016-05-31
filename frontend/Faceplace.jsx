var React = require('react'),
    ReactDOM = require('react-dom'),
    Router = require('react-router').Router,
    Route = require('react-router').Route,
    IndexRoute = require('react-router').IndexRoute,
    hashHistory = require('react-router').hashHistory,

    LogInForm = require('./components/LogInForm'),
    SignUpForm = require('./components/SignUpForm');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Faceplace</h1>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Route path='/' component={ App }>
    <IndexRoute component={ SignUpForm } />
    <Route path='sign_up' component={ SignUpForm } />
    <Route path='log_in' component={ LogInForm } />
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  var root = document.getElementById('content');
  var router = <Router history={hashHistory} routes={routes} />;
  ReactDOM.render(router, root);
});