var React = require('react');
var _ = require('lodash');
var EventsActionCreators = require('../../actions/EventsActionCreators');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var Button = require('react-bootstrap/lib/Button');
var EventFilter = React.createClass({
  changeFilter: function(tier) {
    EventsActionCreators.changeFilter(tier);
  },
  getBronze: function() {
    if (this.props.tier !== 'Bronze') {
      return <Button className={this.props.currentFilter === 'Bronze' ? 'active' : ''} onClick={_.bind(this.changeFilter, this, 'Bronze')}>Bronze</Button>;
    }
  },

  getSilver: function() {
    if (this.props.tier !== 'Bronze') {
      return <Button className={this.props.currentFilter === 'Silver' ? 'active' : ''} onClick={_.bind(this.changeFilter, this, 'Silver')}>Silver</Button>;
    }
  },

  getAll: function() {
    if (this.props.tier !== 'Bronze') {
      return <Button className={this.props.currentFilter === null ? 'active' : ''} onClick={_.bind(this.changeFilter, this, null)}>All</Button>;
    }
  },

  getGold: function() {
    if (this.props.tier === 'Gold') {
      return <Button className={this.props.currentFilter === 'Gold' ? 'active' : ''} onClick={_.bind(this.changeFilter, this, 'Gold')}>Gold</Button>;
    }
  },
  render: function() {
    return (
      <ButtonGroup>
        {this.getBronze()}
        {this.getSilver()}
        {this.getGold()}
        {this.getAll()}
      </ButtonGroup>
    );
  }
});

module.exports = EventFilter;
