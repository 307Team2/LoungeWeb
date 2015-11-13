var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var SessionStore = require('../stores/SessionStore.js');
var AccountStore = require('../stores/AccountStore.js');
var SessionActionCreators = require('../actions/SessionActionCreators.jsx');

var StripeCheckout = require('react-stripe-checkout');
var Header = require('./shared/Header.jsx');
var MembershipModal = require('./shared/modals/MembershipModal.jsx');
var StripeModal = require('./shared/modals/StripeModal.jsx');

var getStateFromStores = function() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: AccountStore.getUser(),
    isStripeOpen: SessionStore.isStripeOpen(),
    newTier: SessionStore.getTierName()
  };
}

var Lounge = React.createClass({
  
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    AccountStore.addChangeListener(this._onChange);
    if (this.state.isLoggedIn) {
      WebAPIUtils.loadAccountData();
    }
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

  openStripeModal: function(name) {
    SessionActionCreators.openStripeModal(name);
  },

  loadModals: function() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <MembershipModal user={this.state.user} isOpen={this.isSubscribed()} openStripeModal={this.openStripeModal} />;
          <StripeModal user={this.state.user} isOpen={this.state.isStripeOpen} tier={this.state.newTier}/>;
        </div>
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

    if (!Object.keys(this.state.user).length && this.state.isLoggedIn) {
      return this.renderLoadingScreen();
    }

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
