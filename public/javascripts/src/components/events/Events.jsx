var React = require('react');
var _ = require('lodash');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var EventsStore = require('../../stores/EventsStore');
var AccountStore = require('../../stores/AccountStore');
var EventsActionCreators = require('../../actions/EventsActionCreators');

var EventItem = require('./EventItem.jsx');
var EventFilter = require('./EventFilter.jsx');
var CreateEvent = require('./CreateEvent.jsx');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Button = require('react-bootstrap/lib/Button');

var getStateFromStores = function() {
  return {
    events: EventsStore.getAllEvents(),
    filter: EventsStore.getFilter(),
<<<<<<< HEAD
    createEvent: EventsStore.isCreateEvent(),
    user: AccountStore.getUser()
=======
    createEvent: EventsStore.isCreateEvent()
>>>>>>> c54199885a95c082ba65f631c49822a9d730ec6f
  };
}

var Events = React.createClass({
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    EventsStore.addChangeListener(this._onChange);
<<<<<<< HEAD
    AccountStore.addChangeListener(this._onChange);
=======
>>>>>>> c54199885a95c082ba65f631c49822a9d730ec6f
    WebAPIUtils.loadEvents();
  },

  componentWillUnmount: function() {
    EventsStore.removeChangeListener(this._onChange);
<<<<<<< HEAD
    AccountStore.removeChangeListener(this._onChange);
=======
>>>>>>> c54199885a95c082ba65f631c49822a9d730ec6f
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  getEventCreation: function() {
    if (this.state.createEvent) {
      return <CreateEvent handleCancel={this.toggleCreateEvent}/>;
    }
  },

  getEventCreationButton: function() {
    if (!this.state.createEvent) {
      return <Button bsStyle="primary" onClick={this.toggleCreateEvent}>Create Event</Button>;
    }
  },

  getEvents: function() {
    var self = this;
    return _.map(this.state.events, function(event, i) {
      if (!self.state.filter || event.tier === self.state.filter) {
        return (
          <EventItem event={event} key={i} userId={self.state.user._id} />
        );
      }
    });
  },

  toggleCreateEvent: function() {
    EventsActionCreators.toggleCreateEvent();
  },

  render: function() {
    return (
      <div className='events'>
        <h1>Events</h1>
        <Row className='event-dashboard'>
          <Col sm={9}>
            <EventFilter tier={AccountStore.getUser().tier} currentFilter={this.state.filter}/>
          </Col>
          <Col sm={3}>
            {this.getEventCreationButton()}
          </Col>
        </Row>
        {this.getEventCreation()}
        <ul>
          {this.getEvents()}
        </ul>
      </div>
    );
  }

});

module.exports = Events;
