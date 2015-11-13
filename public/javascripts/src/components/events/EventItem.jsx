var React = require('react');
var _ = require('lodash');
var WebAPIUtils = require('../../utils/WebAPIUtils.js')

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Link = require('react-router').Link;
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var Button = require('react-bootstrap/lib/Button');
var moment = require('moment');
var ellipsize = require('ellipsize');

var EventItem = React.createClass({
  
  rsvpToEvent: function(e) {
    WebAPIUtils.rsvpToEvent(this.props.event._id, e.target.dataset.rsvp);
  },

  render: function() {
    return (
      <li className='event-item'>
        <Row>
          <Col sm={2}>
            <div className='event-date'>
              <h5 className='month'>{moment(this.props.event.startDate).format('MMM')}</h5>
              <h3 className='date'>{moment(this.props.event.startDate).format('DD')}</h3>
            </div>
          </Col>
          <Col sm={10}>
            <Link className='event-name' to={'/events/' + this.props.event._id}><h3>{ellipsize(this.props.event.title, 33)}</h3></Link>
            <ButtonGroup className='event-rsvp'>
              <Button onClick={this.rsvpToEvent} className={this.props.event.going.indexOf(this.props.userId) > -1 ? 'active' : ''} data-rsvp="going">Going</Button>
              <Button onClick={this.rsvpToEvent} className={this.props.event.maybe.indexOf(this.props.userId) > -1 ? 'active' : ''} data-rsvp="maybe">Maybe</Button>
              <Button onClick={this.rsvpToEvent} className={this.props.event.ignore.indexOf(this.props.userId) > -1 ? 'active' : ''} data-rsvp="ignore">Ignore</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </li>
    );
  }
});

module.exports = EventItem;
