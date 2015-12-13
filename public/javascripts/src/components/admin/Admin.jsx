var React = require('react');
var _ = require('lodash');
var WebAPIUtils = require('../../utils/WebAPIUtils');
var AdminStore = require('../../stores/AdminStore');
var AccountStore = require('../../stores/AccountStore');
// var EventsActionCreators = require('../../actions/EventsActionCreators');

var UserItem = require('./UserItem.jsx');
var ListGroup = require('react-bootstrap/lib/ListGroup');

var getStateFromStores = function() {
  return {
    user: AccountStore.getUser(),
    users: AdminStore.getAllUsers()
  };
};

var Admin = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    AdminStore.addChangeListener(this._onChange);
    AccountStore.addChangeListener(this._onChange);
    WebAPIUtils.loadUsers();
  },

  componentWillUnmount: function() {
    AdminStore.removeChangeListener(this._onChange);
    AccountStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  toggleCreateUser: function() {
    // EventsActionCreators.toggleCreateEvent();
  },

  getUsers: function() {
    var self = this;
    return _.map(this.state.users, function(user, i) {
      return (
        <UserItem user={user} currentUser={self.state.user} key={i} />
      );
    });
  },

  render: function() {
    if (!this.state.user || !this.state.user.isAdmin) {
      return (
        <h1>You are not authorized to view this page</h1>
      );
    } else {
      return (
        <div className='admin'>
          <h1>Users</h1>
          <ListGroup>
            {this.getUsers()}
          </ListGroup>
        </div>
      );
    }
  }

});

module.exports = Admin;
