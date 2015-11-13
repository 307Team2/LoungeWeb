var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var ProfileStore = require('../../stores/ProfileStore.js');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Feed = require('../feed/Feed.jsx');
var Panel = require('react-bootstrap/lib/Panel');
var Image = require('react-bootstrap/lib/Image');

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
        <Row>
          <Col sm={4}>
            <Panel header={this.state.data.firstName}>
              <Image src={this.state.data.photoUrl} rounded />
              <div>{this.state.data.age}</div>
              <div>{this.state.data.location}</div>
              <div>{this.state.data.organization}</div>
              <div>{this.state.data.jobTitle}</div>
            </Panel>
          </Col>
          <Col sm={8}>
            <Feed/>
          </Col>
        </Row>
      </div>
    );
  }
});
