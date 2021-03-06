var React = require('react');
var filepicker = require('filepicker-js');
var History = require('react-router').History;
var WebAPIUtils = require('../../utils/WebAPIUtils.js');

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');
var Link = require('react-router').Link;

var CreateUser = React.createClass({

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
      photoUrl: '',
      password: ''
    };
  },

  componentDidMount: function() {
    this.refs.filepicker.addEventListener('change', this.handleChangeFileUrl, false);
  },

  componentWillUnmount: function() {
    this.refs.filepicker.removeEventListener('change', this.handleChangeFileUrl, false);
  },

  handleChangeFileUrl: function(e) {
    this.setState({
      photoUrl: e.target.value
    });
  },

  handleChange: function(e) {
    var newState = {};
    newState[e.target.id] = this.refs[e.target.id].getValue();
    this.setState(newState);
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var email = this.state.email;
    var firstName = this.state.firstName;
    var lastName = this.state.lastName;
    var age = this.state.age;
    var location = this.state.location;
    var organization = this.state.organization;
    var jobTitle = this.state.jobTitle;
    var password = this.state.password;
    var photoUrl = this.state.photoUrl;

    WebAPIUtils.createUser(email, firstName, lastName, age, location, organization, jobTitle, password, photoUrl);
  },

  render: function() {
    return(
      <Panel header="Create User">
        <form onSubmit={this._onSubmit}>
          <Input type="email" label="Email" id="email" ref="email" onChange={this.handleChange}/>
          <Input type="text" label="First Name" id="firstName" ref="firstName" onChange={this.handleChange}/>
          <Input type="text" label="Last Name" id="lastName" ref="lastName" onChange={this.handleChange}/>
          <Input type="number" label="Age" id="age" ref="age" onChange={this.handleChange}/>
          <Input type="text" label="Location" id="location" ref="location" onChange={this.handleChange}/>
          <Input type="text" label="Organization" id="organization" ref="organization" onChange={this.handleChange}/>
          <Input type="text" label="Job Title" id="jobTitle" ref="jobTitle" onChange={this.handleChange}/>
          <div className="form-control">
            <input data-fp-apikey="AsEmxeHJuRNehRzcFoPLkz" ref="filepicker" type="filepicker"/>
          </div>
          <Input type="password" label="password" id="password" ref="password" onChange={this.handleChange}/>
          <ButtonToolbar>
            <Button bsStyle="primary" componentClass="input" type="submit" value="Submit"></Button>
          </ButtonToolbar>
        </form>
      </Panel>
    );
  }
});

module.exports = CreateUser;
