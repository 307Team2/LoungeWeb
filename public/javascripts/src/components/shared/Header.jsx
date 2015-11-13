var React = require('react');
var ReactPropTypes = React.PropTypes;
var SessionActionCreators = require('../../actions/SessionActionCreators.jsx');

var Navbar = require('react-bootstrap/lib/Navbar');
var NavBrand = require('react-bootstrap/lib/NavBrand');
var Nav = require('react-bootstrap/lib/Nav');
var NavItem = require('react-bootstrap/lib/NavItem');
var NavDropdown = require('react-bootstrap/lib/NavDropdown');
var MenuItem = require('react-bootstrap/lib/MenuItem');
var Link = require('react-router').Link;
var History = require('react-router').History;

var Header = React.createClass({

  mixins: [ History ],

  propTypes: {
    isLoggedIn: ReactPropTypes.bool,
    email: ReactPropTypes.string
  },

  getInitialState: function() {
    return {
      isViewDropdownOpen: false,
      isUserDropdownOpen: false
    };
  },

  toggleViewDropdown: function() {
    this.setState({
      isViewDropdownOpen: !this.state.isViewDropdownOpen
    });
  },

  toggleUserDropdown: function() {
    this.setState({
      isUserDropdownOpen: !this.state.isUserDropdownOpen
    });
  },

  logout: function() {
    this.toggleUserDropdown();
    SessionActionCreators.logout();
  },

  renderViewDropdown: function() {
    if (this.props.isLoggedIn) {
      return(
        <NavDropdown title="View" id="collapsible-navbar-dropdown" open={this.state.isViewDropdownOpen} onToggle={this.toggleViewDropdown}>
          <li><Link to="/feed/" onClick={this.toggleViewDropdown}>Feed</Link></li>
          <li><Link to="" onClick={this.toggleViewDropdown}>Events</Link></li>
        </NavDropdown>
      );
    } else {
      return <NavItem componentClass={Link} to={'/signup'}>Sign Up</NavItem>;
    }
  },

  renderUserDropdown: function() {
    if (this.props.isLoggedIn) {
      return(
        <NavDropdown title={this.props.user.firstName} id="collapsible-navbar-dropdown2" open={this.state.isUserDropdownOpen} onToggle={this.toggleUserDropdown}>
          <li><Link to={'/user/'+this.props.user._id} onClick={this.toggleUserDropdown}>My Profile</Link></li>
          <li><Link to={'/account'} onClick={this.toggleUserDropdown}>Account</Link></li>
          <li><Link to={'/'} onClick={this.logout}>Logout</Link></li>
        </NavDropdown>
      );
    } else {
      return <NavItem componentClass={Link} to={'/login'}>Log In</NavItem>;
    }
  },

  render: function() {
    return (
      <Navbar>
        <NavBrand><Link to={'/'}>Lounge</Link></NavBrand>
        <Nav>{this.renderViewDropdown()}</Nav>
        <Nav>{this.renderUserDropdown()}</Nav>
      </Navbar>
    );
  }

});

module.exports = Header;
