var React = require('react');
var _ = require('lodash');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Link = require('react-router').Link;
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var Button = require('react-bootstrap/lib/Button');
var moment = require('moment');
var ellipsize = require('ellipsize');

var EventItem = React.createClass({
  render: function() {
    return (
      <li className='event-item'>
        <Row>
          <Col sm={2}>
            <div className='event-date'>
              <h5 className='month'>{moment(this.props.event.date).format('MMM')}</h5>
              <h3 className='date'>{moment(this.props.event.date).format('DD')}</h3>
            </div>
          </Col>
          <Col sm={10}>
            <Link to={'/events/' + this.props.event._id}><h3 className='event-name'>{ellipsize(this.props.event.name, 33)}</h3></Link>
            <ButtonGroup className='event-rsvp'>
              <Button>Going</Button>
              <Button>Maybe</Button>
              <Button>Ignore</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </li>
    );
  }
});

module.exports = EventItem;
