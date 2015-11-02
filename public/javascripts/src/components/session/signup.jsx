var React = require('react');
var History = require('react-router').History;
var WebAPIUtils = require('../../utils/WebAPIUtils.js');

module.exports = React.createClass({

  mixins: [ History ],

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
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Sign Up</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this._onSubmit}>
            <div className="form-group">
              <label htmlFor="signup-email">email</label>
              <input type="email" className="form-control" id="signup-email" ref="email" placeholder="email" />
            </div>
            <div className="form-group">
              <label htmlFor="signup-firstName">firstName</label>
              <input type="text" className="form-control" id="signup-firstName" ref="firstName" placeholder="firstName" />
            </div>
            <div className="form-group">
              <label htmlFor="signup-lastName">lastName</label>
              <input type="text" className="form-control" id="signup-lastName" ref="lastName" placeholder="lastName" />
            </div>
            <div className="form-group">
              <label htmlFor="signup-age">age</label>
              <input type="text" className="form-control" id="signup-age" ref="age" placeholder="age" />
            </div>
            <div className="form-group">
              <label htmlFor="signup-location">location</label>
              <input type="text" className="form-control" id="signup-location" ref="location" placeholder="location" />
            </div>
            <div className="form-group">
              <label htmlFor="signup-organization">organization</label>
              <input type="text" className="form-control" id="signup-organization" ref="organization" placeholder="organization" />
            </div>
            <div className="form-group">
              <label htmlFor="signup-jobTitle">jobTitle</label>
              <input type="text" className="form-control" id="signup-jobTitle" ref="jobTitle" placeholder="jobTitle" />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">password</label>
              <input type="password" className="form-control" id="signup-password" ref="password" placeholder="password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }

});
