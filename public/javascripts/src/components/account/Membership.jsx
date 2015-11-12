var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var AccountStore = require('../../stores/AccountStore.js');

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
          Current Tier: {this.props.user.tier}&nbsp;
          (<a onClick={this.removeTier}>Remove</a>)
        </small>
      );
    }
  },

  render: function() {
    return (
      <div className="membership">
        <h3>
          Membership&nbsp;
          {this.renderCurrentMembership()}
        </h3>
        <div className="row">
          {this.renderMembershipTier("Bronze", "For the plebs.")}
          {this.renderMembershipTier("Silver", "For the wealthy.")}
          {this.renderMembershipTier("Gold", "For the top 1%.")}
        </div>
      </div>
    );
  }
});

module.exports = Membership;
