var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var SessionStore = require('../stores/SessionStore.js');
var AccountStore = require('../stores/AccountStore.js');
var Feed = require('./feed/Feed.jsx');

var getStateFromStores = function() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: AccountStore.getUser()
  };
}

var Home = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    AccountStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
    AccountStore.removeChangeListener(this._onChange);
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
      <div className="homepage">
        <h1>Welcome back {this.state.user.firstName} {this.state.user.lastName}!</h1>
        <div className="row">
          <div className="col-sm-4">

          </div>
          <div className="col-sm-8">
            <Feed/>
          </div>
        </div>
      </div>
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

module.exports = Home;
