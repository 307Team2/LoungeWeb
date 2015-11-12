var React = require('react');
var History = require('react-router').History;
var WebAPIUtils = require('../../utils/WebAPIUtils.js');

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Link = require('react-router').Link;

var Login = React.createClass({

  mixins: [ History ],

  getInitialState: function() {
    return {
      email: '',
      password: ''
    };
  },

  handleEmailChange: function() {
    var value = this.refs.email.getValue();
    this.setState({
      email: value
    });
  },

  handlePasswordChange: function() {
    var value = this.refs.password.getValue();
    this.setState({
      password: value
    });
  },

  _onSubmit: function(e) {
    e.preventDefault();

    WebAPIUtils.login(this.state.email, this.state.password);
    this.history.pushState(null, '/');
  },

  render: function() {
    return(
      <Panel header="Log In">
        <form onSubmit={this._onSubmit}>
          <Input type="text" label="Email Address" ref="email" onChange={this.handleEmailChange}/>
          <Input type="password" label="Password" ref="password" onChange={this.handlePasswordChange}/>
          <ButtonToolbar>
            <Button bsStyle="primary" componentClass="input" type="submit" value="Submit"></Button>
            <Button bsStyle="link" componentClass={Link} to={'/signup'}>Don't have an account?</Button>
          </ButtonToolbar>
        </form>
      </Panel>
    );
  }

});

module.exports = Login;
