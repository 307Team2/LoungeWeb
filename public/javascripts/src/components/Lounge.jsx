var React = require('react');
var SessionStore = require('../stores/SessionStore.js');
var Header = require('./shared/Header.jsx');

var getStateFromStores = function() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: SessionStore.getUser()
  };
}

var Lounge = React.createClass({
  
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

  render: function() {
    return (
      <div className="app">
        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Lounge;
