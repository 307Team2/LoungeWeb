var React = require('react');
var EventItem = require('./EventItem.jsx');

var Events = React.createClass({
  getEvents: function() {
    return this.props.events.map(function(event, i) {
      return (
        <li><EventItem event={event} key={i} /></li>
      );
    });
  },
  render: function() {
    return (
      <div className='events'>
        <h1>Events</h1>
        <ul>
          {this.getEvents()}
        </ul>
      </div>
    );
  }
});

module.exports = Events;
