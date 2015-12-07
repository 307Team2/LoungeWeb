var React = require('react');

var UserItem = React.createClass({
  render: function() {
    return (
      <div>
        <h3>{this.props.user.name}</h3>
      </div>
    );
  }
});

module.exports = UserItem;
