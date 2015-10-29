var React = require('react');

module.exports = React.createClass({

  loginForm: function() {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Login</h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label for="loginEmail">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
            </div>
            <div className="form-group">
              <label for="loginPassword">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  },

  signupForm: function() {
    return(
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Sign Up</h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <label for="signupEmail">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
            </div>
            <div className="form-group">
              <label for="signupPassword">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
              <label for="signupConfirmPassword">Confirm Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div>
        <h1>Home</h1>
        {this.loginForm()}
        {this.signupForm()}
      </div>
    );
  }
});
