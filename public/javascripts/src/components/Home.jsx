var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var SessionStore = require('../stores/SessionStore.js');
var AccountStore = require('../stores/AccountStore.js');

var Feed = require('./feed/Feed.jsx');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Link = require('react-router').Link;

var getStateFromStores = function() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    user: AccountStore.getUser()
  };
}

var Home = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onChange);
    AccountStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SessionStore.removeChangeListener(this._onChange);
    AccountStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  navigateTo: function(path) {
    this.history.pushState(null, path);
  },

  renderLandingPage: function() {
    return(
      <div>
        <h1>Welcome to Fireside!</h1>
        <ButtonToolbar>
          <a href="/signup"><Button>Sign Up</Button></a>
          <Button componentClass={Link} to={'/login'}>Log In</Button>
        </ButtonToolbar>
      </div>
    );
  },

  renderHomepage: function() {
    return(
      <div className="homepage">
        <Row>
          <Col sm={12}>
            <Feed/>
          </Col>
        </Row>
      </div>
    );
  },

  render: function() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          {this.renderHomepage()}
        </div>
      );
    }

    return (
      <div>
        {this.renderLandingPage()}
      </div>
    );
  }
});

module.exports = Home;
