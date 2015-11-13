var React = require('react');
var WebAPIUtils = require('../../../utils/WebAPIUtils.js');
var Modal = require("react-bootstrap/lib/Modal");
var Grid = require("react-bootstrap/lib/Grid");
var Row = require("react-bootstrap/lib/Row");
var Col = require("react-bootstrap/lib/Col");
var Panel = require("react-bootstrap/lib/Panel");

var MembershipTier = React.createClass({

  updateTier: function() {
    this.props.updateTier(this.props.name);
  },
  
  render: function() {
    return(
      <Col sm={4}>
        <Panel header={this.props.name}>
          <p>{this.props.description}</p>
          <button className="btn btn-primary" onClick={this.updateTier} disabled={this.props.active}>Switch to {this.props.name}</button>
        </Panel>
      </Col>
    );
  }

});

var MembershipModal = React.createClass({

  closeModal: function() {
    this.setState({showModal: false});
  },

  goToProfile: function() {
    this.history.pushState(null, '/user/' + this.state.data.user._id)
  },

  updateTier: function(name) {
    this.props.openStripeModal(name);
  },

  renderMembershipTier: function(name, description) {
    if (name === this.props.user.tier) {
      return <MembershipTier updateTier={this.updateTier} name={name} active={true} description={description} />;
    } else {
      return <MembershipTier updateTier={this.updateTier} name={name} description={description} />;      
    }
  },

  render: function() {
    return(
      <Modal show={!this.props.isOpen} onHide={this.closeModal} backdrop="static">
        <Modal.Header>
          <Modal.Title>
            Select a Membership
            <small>{this.props.user.tier}</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.user.tier}</p>
          <Row>
            {this.renderMembershipTier("Bronze", "For the plebs.")}
            {this.renderMembershipTier("Silver", "For the wealthy.")}
            {this.renderMembershipTier("Gold", "For the top 1%.")}
          </Row>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = MembershipModal;
