var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var SessionStore = require('../stores/SessionStore.js');

var LoginForm = require('./session/login.jsx');
var SignupForm = require('./session/signup.jsx');

var getStateFromStores = function() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: SessionStore.getUser()
  };
}

module.exports = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  renderLandingPage: function() {
    return(
      <div>
        <h1>Welcome to Lounge!</h1>
        <a className="btn btn-default" href="/signup">Sign up</a>
        <a className="btn btn-default" href="/login">Log in</a>
      </div>
    );
  },

  renderHomepage: function() {
    return(
      <h1>Welcome back {this.state.user.firstName} {this.state.user.lastName}!</h1>
    );
  },

  render: function() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          {this.renderHomepage()}
        </div>
      );
    }
   
    return (
      <div>
        {this.renderLandingPage()}
      </div>
    );
  }
});
