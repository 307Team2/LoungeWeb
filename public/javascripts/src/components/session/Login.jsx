var React = require('react');
var History = require('react-router').History;
var WebAPIUtils = require('../../utils/WebAPIUtils.js');


var Login = React.createClass({

  mixins: [ History ],

  _onSubmit: function(e) {
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;

    WebAPIUtils.login(email, password);
    this.history.pushState(null, '/');
  },

  render: function() {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Login</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this._onSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" ref="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" ref="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = Login;
