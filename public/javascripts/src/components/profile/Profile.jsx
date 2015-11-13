var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ProfileStore = require('../../stores/ProfileStore.js');

var getStateFromStores = function() {
  return {
    data: ProfileStore.getProfileData(),
    posts: ProfileStore.getProfilePosts()
  };
}

module.exports = React.createClass({
  
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    ProfileStore.addChangeListener(this._onChange);
    WebAPIUtils.loadProfileData(this.props.params.userId);
  },

  componentWillUnmount: function() {
    ProfileStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  render: function() {
    return (
      <div className="profile">
        <h1>Profile for {this.state.data.firstName} {this.state.data.lastName}</h1>
      </div>
    );
  }
});
