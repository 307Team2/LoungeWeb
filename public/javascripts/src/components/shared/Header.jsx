var React = require('react');
var ReactPropTypes = React.PropTypes;
var History = require('react-router').History;
var SessionActionCreators = require('../../actions/SessionActionCreators.jsx');

var Header = React.createClass({

  mixins: [ History ],

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string
  },

  logout: function() {
    this.history.pushState(null, '/')
    SessionActionCreators.logout();
  },

  goToAccount: function() {
    this.history.pushState(null, '/account');
  },

  renderDropdown: function() {
    if (this.props.isLoggedIn) {
      return(
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.user.firstName} <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#" onClick={this.goToAccount}>Account</a></li>
            <li><a href="#" onClick={this.logout}>Logout</a></li>
          </ul>
        </li>
      );
    } else {
      return(<li><a href="/login">Log in</a></li>);
    }
  },

  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                Lounge
              </a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                {this.renderDropdown()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

});

module.exports = Header;
