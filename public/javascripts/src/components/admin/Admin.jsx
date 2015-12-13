var React = require('react');
var _ = require('lodash');
var WebAPIUtils = require('../../utils/WebAPIUtils');
var AdminStore = require('../../stores/AdminStore');
var AccountStore = require('../../stores/AccountStore');
// var EventsActionCreators = require('../../actions/EventsActionCreators');

var CreateUser = require('./CreateUser.jsx');
var UserItem = require('./UserItem.jsx');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

var getStateFromStores = function() {
  return {
    user: AccountStore.getUser(),
    users: AdminStore.getAllUsers(),
    createUser: false
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

  getUserCreationButton: function() {
    if (!this.state.createUser) {
      return <Button className='user-button' bsStyle="primary" onClick={this.toggleCreateUser}>Add User</Button>;
    }
  },

  getUsers: function() {
    var self = this;
    return _.map(this.state.users, function(user, i) {
      return (
        <UserItem user={user} currentUser={self.state.user} key={i} />
      );
    });
  },

  toggleCreateUser: function() {
    this.setState({ createUser: !this.state.createUser });
  },

  getSignupForm: function() {
    if (this.state.createUser) {
      return <CreateUser />
    }
  },

  render: function() {
    if (!this.state.user || !this.state.user.isAdmin) {
      return (
        <h1>You are not authorized to view this page</h1>
      );
    } else {
      return (
        <div className='admin'>
          <Row>
            <Col sm={9}>
              <h1>Users</h1>
            </Col>
            <Col sm={3}>
              {this.getUserCreationButton()}
            </Col>
          </Row>
          {this.getSignupForm()}
          <ListGroup>
            {this.getUsers()}
          </ListGroup>
        </div>
      );
    }
  }

});

module.exports = Admin;
