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
      isDropdownOpen: false
    };
  },

  toggleDropdown: function() {
    this.setState({
      isDropdownOpen: !this.state.isDropdownOpen
    });
  },

  logout: function() {
    this.toggleDropdown();
    SessionActionCreators.logout();
  },

  getNavRight: function() {
    if (this.props.isLoggedIn) {
      return(
        <Nav right>
          <li><Link to={'/'}>Home</Link></li>
            <li><Link to={'/events'}>Events</Link></li>
          <NavDropdown title={this.props.user.firstName} id="collapsible-navbar-dropdown" open={this.state.isDropdownOpen} onToggle={this.toggleDropdown}>
            <li><Link to={'/user/'+this.props.user._id} onClick={this.toggleDropdown}>My Profile</Link></li>
            <li><Link to={'/account'} onClick={this.toggleDropdown}>Account</Link></li>
            <li><Link to={'/'} onClick={this.logout}>Logout</Link></li>
          </NavDropdown>
        </Nav>
      );
    } else {
      return <Nav right><NavItem href='/signup'>Sign Up</NavItem></Nav>;
    }
  },

  render: function() {
    return (
      <Navbar>
        <NavBrand><Link to={'/'}>
          <img src='/images/logo.svg'/>
          <h1>FIRESIDE</h1>
        </Link></NavBrand>
        {this.getNavRight()}
      </Navbar>
    );
  }

});

module.exports = Header;
