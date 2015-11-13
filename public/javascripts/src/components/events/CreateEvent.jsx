var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Button = require('react-bootstrap/lib/Button');

var CreateEvent = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      description: '',
      startDate: null
    };
  },

  _onSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title;
    var description = this.state.description;
    var startDate = this.state.startDate;

    WebAPIUtils.createEvent(title, description, startDate);
  },

  handleChange: function(e) {
    var newState = {};
    newState[e.target.id] = this.refs[e.target.id].getValue();
    this.setState(newState);
  },

  render: function() {
    return (
      <div className='create-event'>
        <form onSubmit={this._onSubmit}>
          <Input type="text" label="What's your event called?" id="title" ref="title" onChange={this.handleChange}/>
          <Input type="date" label="When's your event?" id="startDate" ref="startDate" onChange={this.handleChange}/>
          <Input type="textarea" label="What's your event about?" id="description" ref="description" placeholder="My awesome event description" onChange={this.handleChange}/>
          <ButtonToolbar>
            <Button bsStyle="primary" componentClass="input" type="submit" value="Create Event"></Button>
            <Button componentClass="input" value="Cancel" onClick={this.props.handleCancel}></Button>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
});

module.exports = CreateEvent;
