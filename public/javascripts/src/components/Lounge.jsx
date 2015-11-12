var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var SessionStore = require('../stores/SessionStore.js');
var AccountStore = require('../stores/AccountStore.js');
var Header = require('./shared/Header.jsx');
var MembershipModal = require('./shared/modals/MembershipModal.jsx');

var getStateFromStores = function() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: AccountStore.getUser()
  };
}

var Lounge = React.createClass({
  
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    AccountStore.addChangeListener(this._onChange);
    WebAPIUtils.loadAccountData();
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
    AccountStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  isSubscribed: function() {
    return this.state.user.tier === "Bronze" || this.state.user.tier === "Silver" || this.state.user.tier === "Gold";
  },

  loadModals: function() {
    // Only load modals if the user has been loaded
    if (Object.keys(this.state.user).length) {
      return (
        <MembershipModal user={this.state.user} isSubscribed={this.isSubscribed()} />
      );
    }
  },

  renderLoadingScreen: function() {
    return(
      <div className="loading-screen">
        <div className="loader circles-loader"></div>
      </div>
    );
  },

  render: function() {
    return (
      <div className="app">
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        <div className="container">
          {this.props.children}
        </div>
        {this.loadModals()}
      </div>
    );
  }
});

module.exports = Lounge;
