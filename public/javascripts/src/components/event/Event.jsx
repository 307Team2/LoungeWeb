var React = require('react');
var _ = require('lodash');
var moment = require('moment');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var EventStore = require('../../stores/EventStore');
// var EventsActionCreators = require('../../actions/EventsActionCreators');

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
var Link = require('react-router').Link;

var getStateFromStores = function() {
  return {
    event: EventStore.getEvent(),
  }
}

var Event = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    EventStore.addChangeListener(this._onChange);
    WebAPIUtils.loadEvent(this.props.params.eventId);
  },

  componentWillUnmount: function() {
    EventStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  renderLoadingScreen: function() {
    return(
      <div className="loading-screen">
        <div className="loader circles-loader"></div>
      </div>
    );
  },

  renderAttendees: function(rsvp) {
    if (this.state.event[rsvp].length === 0) {
      return <ListGroupItem >No one.</ListGroupItem>
    }
    return this.state.event[rsvp].map(function(user) {
      return <ListGroupItem key={user._id}><Link to={'/user/'+user._id}>{user.displayName}</Link></ListGroupItem>
    });
  },

  render: function() {

    if (!this.state.event) {
      return this.renderLoadingScreen();
    }

    return (
      <div className='event-detail'>
        <h1>{this.state.event.title} <small><Link to={'/events'}>Back to Events</Link></small></h1>
        <Row>
          <Col sm={3}>
            <ListGroup>
              <ListGroupItem header="Information"></ListGroupItem>
              <ListGroupItem><strong>Tier: </strong>{this.state.event.tier}</ListGroupItem>
              <ListGroupItem><strong>Date: </strong>{moment(this.state.event.startDate).format("MMM Do YY")}</ListGroupItem>
              <ListGroupItem><strong>Description: </strong>{this.state.event.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col sm={3}>
            <ListGroup>
              <ListGroupItem header="Going"></ListGroupItem>
              {this.renderAttendees('going')}
            </ListGroup>
          </Col>
          <Col sm={3}>
            <ListGroup>
              <ListGroupItem header="Maybe"></ListGroupItem>
              {this.renderAttendees('maybe')}
            </ListGroup>
          </Col>
          <Col sm={3}>
            <ListGroup>
              <ListGroupItem header="Declined"></ListGroupItem>
              {this.renderAttendees('ignore')}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }

});

module.exports = Event;
