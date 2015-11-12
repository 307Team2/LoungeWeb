var React = require('react');
var History = require('react-router').History;
var WebAPIUtils = require('../../utils/WebAPIUtils.js');

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Link = require('react-router').Link;

var Signup = React.createClass({

  mixins: [ History ],

  getInitialState: function() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      age: '',
      location: '',
      organization: '',
      jobTitle: '',
      password: ''
    };
  },

  handleChange: function(e) {
    var newState = {};
    newState[e.target.id] = this.refs[e.target.id].getValue();
    this.setState(newState);
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.value;
    var firstName = this.refs.firstName.value;
    var lastName = this.refs.lastName.value;
    var age = this.refs.age.value;
    var location = this.refs.location.value;
    var organization = this.refs.organization.value;
    var jobTitle = this.refs.jobTitle.value;
    var password = this.refs.password.value;

    WebAPIUtils.signup(email, firstName, lastName, age, location, organization, jobTitle, password);
    this.history.pushState(null, '/');
  },

  render: function() {
    return(
      <Panel header="Sign Up">
        <form onSubmit={this._onSubmit}>
          <Input type="email" label="email" id="email" ref="email" onChange={this.handleChange}/>
          <Input type="text" label="firstName" id="firstName" ref="firstName" onChange={this.handleChange}/>
          <Input type="text" label="lastName" id="lastName" ref="lastName" onChange={this.handleChange}/>
          <Input type="number" label="age" id="age" ref="age" onChange={this.handleChange}/>
          <Input type="text" label="location" id="location" ref="location" onChange={this.handleChange}/>
          <Input type="text" label="organization" id="organization" ref="organization" onChange={this.handleChange}/>
          <Input type="text" label="jobTitle" id="jobTitle" ref="jobTitle" onChange={this.handleChange}/>
          <Input type="password" label="password" id="password" ref="password" onChange={this.handleChange}/>
          <ButtonToolbar>
            <Button bsStyle="primary" componentClass="input" type="submit" value="Submit"></Button>
            <Button bsStyle="link" componentClass={Link} to={'/login'}>Already have an account?</Button>
          </ButtonToolbar>
        </form>
      </Panel>
    );
  }

});

module.exports = Signup;
