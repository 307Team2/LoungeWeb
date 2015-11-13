var React = require('react');
var _ = require('lodash');
var EventItem = require('./EventItem.jsx');
var EventFilter = require('./EventFilter.jsx');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var realFakeEvents = [
  {
    name: 'take a nap and DO WHATEVER YOU WANT JUST LEAVE ME ALONE OKAY',
    date: Date.now(),
    tier: 'silver',
    desc: 'this event is trash'
  },
  {
    name: 'Get together and have a good cry',
    date: Date.now(),
    tier: 'gold',
    desc: 'Lets all come together and have a good cry; because we all deserve it. Invite a friend who you know deserves a good cry'
  },
  {
    name: 'National Fuckb0i Day',
    date: Date.now(),
    tier: 'bronze',
    desc: 'Everyday is National Fuckboy Day where fuckboys roam in every aspect of your life unwarranted, but lets celebrate their awfulness on this particular day.'
  },
  {
    name: 'The day i get my runescape back',
    date: Date.now(),
    tier: 'silver',
    desc: 'guuyz get around it party when its unbanned'
  }
];

var Events = React.createClass({
  getInitialState: function() {
    return {
      filter: null,
      createEvent: false
    }
  },
  getEvents: function() {
    var self = this;
    return _.map(realFakeEvents, function(event, i) {
      if (!self.state.filter || event.tier === self.state.filter) {
        return (
          <EventItem event={event} key={i} />
        );
      }
    });
  },
  render: function() {
    return (
      <div className='events'>
        <h1>Events</h1>
        <Row className='event-dashboard'>
          <Col sm={9}>
            <EventFilter />
          </Col>
          <Col sm={3}>
            <ButtonInput type="submit" bsStyle="primary" value="Create Event" />
          </Col>
        </Row>
        <ul>
          {this.getEvents()}
        </ul>
      </div>
    );
  }
});

module.exports = Events;
