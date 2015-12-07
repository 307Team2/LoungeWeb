var React = require('react');
var _ = require('lodash');
var UserItem = require('./UserItem.jsx');


var Admin = React.createClass({
  getUsers: function() {
    return _.map(this.props.users, function(user, i) {
      return (
        <UserItem user={user} />
      );
    });
  },
  render: function() {
    return (
      <div className='admin'>
        <h1>Users</h1>
        {this.getUsers()}
      </div>
    );
  }
});

module.exports = Admin;
