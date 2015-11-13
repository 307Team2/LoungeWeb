var React = require('react');
var WebAPIUtils = require('../../../utils/WebAPIUtils.js');
var Modal = require("react-bootstrap/lib/Modal");
var Grid = require("react-bootstrap/lib/Grid");
var Row = require("react-bootstrap/lib/Row");
var Col = require("react-bootstrap/lib/Col");
var Panel = require("react-bootstrap/lib/Panel");
var StripeCheckout = require('react-stripe-checkout');

var StripeModal = React.createClass({

  closeModal: function() {
    this.setState({showModal: false});
  },

  onToken: function(token) {
    WebAPIUtils.createMembershipTier(this.props.tier, token);
  },

  render: function() {
    return(
      <Modal show={this.props.isOpen} onHide={this.closeModal} backdrop="static">
        <Modal.Header>
          <Modal.Title>
            Payment Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_5Q4dkPnbhDn57W6uDx3KpDaK" />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = StripeModal;
