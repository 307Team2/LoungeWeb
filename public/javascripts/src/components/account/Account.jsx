var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var AccountStore = require('../../stores/AccountStore.js');
var Membership = require('./Membership.jsx');

var getStateFromStores = function() {
  return {
    user: AccountStore.getUser()
  };
}

var Account = React.createClass({
  
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    AccountStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AccountStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  goToProfile: function() {
    this.history.pushState(null, '/user/' + this.state.user.user._id)
  },

  render: function() {
    return (
      <div className="account">
        <h1>{this.state.user.firstName} {this.state.user.lastName} <small>Account Information</small></h1>
        <Membership user={this.state.user}/>
      </div>
    );
  }
});

module.exports = Account;
