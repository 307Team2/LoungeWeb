var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');

var Input = require('react-bootstrap/lib/Input');
var ButtonToolbar = require('react-bootstrap/lib/ButtonToolbar');
var Panel = require('react-bootstrap/lib/Panel');
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
    this.refs.title.value = '';
    this.refs.startDate.value = null;
    this.refs.description.value = '';

    WebAPIUtils.createEvent(title, description, startDate);
  },

  handleChange: function(e) {
    var newState = {};
    newState[e.target.id] = this.refs[e.target.id].getValue();
    this.setState(newState);
  },

  render: function() {
    return (
      <Panel>
        <form onSubmit={this._onSubmit}>
          <Input type="text" label="What's your event called?" id="title" ref="title" onChange={this.handleChange}/>
          <Input type="date" label="When's your event?" id="startDate" ref="startDate" onChange={this.handleChange}/>
          <Input type="textarea" label="What's your event about?" id="description" ref="description" placeholder="My awesome event description" onChange={this.handleChange}/>
          <Button className='create-event-btn' componentClass="input" type="submit" value="Create Event"></Button>
          <Button className='create-event-cancel-btn' componentClass="input" value="Cancel" onClick={this.props.handleCancel}></Button>
        </form>
      </Panel>
    );
  }
});

module.exports = CreateEvent;
