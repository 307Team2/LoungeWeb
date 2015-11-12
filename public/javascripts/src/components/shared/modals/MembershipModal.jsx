var React = require('react');
var WebAPIUtils = require('../../../utils/WebAPIUtils.js');
var Modal = require("react-bootstrap/lib/Modal");

var MembershipTier = React.createClass({

  updateTier: function() {
    this.props.updateTier(this.props.name);
  },
  
  render: function() {
    return(
      <div className="col-sm-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.name}</h3>
          </div>
          <div className="panel-body">
            <p>{this.props.description}</p>
            <button className="btn btn-primary" onClick={this.updateTier} disabled={this.props.active}>Switch to {this.props.name}</button>
          </div>
        </div>
      </div>
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
    WebAPIUtils.updateMembershipTier(name);
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
      <Modal show={!this.props.isSubscribed} onHide={this.closeModal} backdrop="static" animation={false}>
        <Modal.Header>
          <Modal.Title>
            Select a Membership
            <small>{this.props.user.tier}</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.user.tier}</p>
          <div className="row">
            {this.renderMembershipTier("Bronze", "For the plebs.")}
            {this.renderMembershipTier("Silver", "For the wealthy.")}
            {this.renderMembershipTier("Gold", "For the top 1%.")}
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = MembershipModal;
