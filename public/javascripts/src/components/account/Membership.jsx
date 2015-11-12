var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var AccountStore = require('../../stores/AccountStore.js');

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Panel = require('react-bootstrap/lib/Panel');
var Button = require('react-bootstrap/lib/Button');

var MembershipTier = React.createClass({

  updateTier: function() {
    this.props.updateTier(this.props.name);
  },
  
  render: function() {
    return(
      <Col sm={4}>
        <Panel header={this.props.name}>
          <p>{this.props.description}</p>
          <Button bsStyle="primary" onClick={this.updateTier} disabled={this.props.active}>Switch to {this.props.name}</Button>
        </Panel>
      </Col>
    );
  }

});

var Membership = React.createClass({

  goToProfile: function() {
    this.history.pushState(null, '/user/' + this.props.user._id)
  },

  removeTier: function() {
    this.updateTier(null);
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

  renderCurrentMembership: function() {
    if (!this.props.user.tier) {
      return(
        <small>
          No tier selected.
        </small>
      );
    } else {
      return(
        <small>
          Current Tier: {this.props.user.tier} (<a onClick={this.removeTier}>Remove</a>)
        </small>
      );
    }
  },

  render: function() {
    return (
      <div className="membership">
        <h3>Membership {this.renderCurrentMembership()}</h3>
        <Row>
          {this.renderMembershipTier("Bronze", "For the plebs.")}
          {this.renderMembershipTier("Silver", "For the wealthy.")}
          {this.renderMembershipTier("Gold", "For the top 1%.")}
        </Row>
      </div>
    );
  }
});

module.exports = Membership;
