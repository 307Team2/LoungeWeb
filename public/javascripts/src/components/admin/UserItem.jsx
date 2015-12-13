var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Link = require('react-router').Link;

var UserItem = React.createClass({
  deleteUser: function() {
    if (this.props.user._id !== this.props.currentUser._id) {
      WebAPIUtils.deleteUser(this.props.user.username);
    }
  },
  render: function() {
    if (!this.props.user) {
      return <div></div>;
    }
    return (
      <ListGroupItem>
        <Row>
          <Col sm={2}>
            <label>Name</label>
            <p><Link to={"/user/" + this.props.user._id}>{this.props.user.firstName + ' ' + this.props.user.lastName}</Link></p>
          </Col>
          <Col sm={3}>
            <label>Email</label>
            <p>{this.props.user.username}</p>
          </Col>
          <Col sm={2}>
            <label>Tier</label>
            <p>{this.props.user.tier}</p>
          </Col>
          <Col sm={2}>
            <label>Age</label>
            <p>{this.props.user.age}</p>
          </Col>
          <Col sm={2}>
          </Col>
          <Col sm={1}>
            <label></label>
            <p style={{cursor: 'pointer'}} onClick={this.deleteUser}><i className="fa fa-times"></i></p>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = UserItem;
