var React = require('react');
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup');
var Button = require('react-bootstrap/lib/Button');
var EventFilter = React.createClass({
  render: function() {
    return (
      <ButtonGroup>
        <Button>Bronze</Button>
        <Button>Silver</Button>
        <Button>Gold</Button>
      </ButtonGroup>
    );
  }
});

module.exports = EventFilter;
