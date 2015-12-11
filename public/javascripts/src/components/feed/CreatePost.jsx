var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');

var Panel = require('react-bootstrap/lib/Panel');
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var CreatePost = React.createClass({

  getInitialState: function() {
    return {
      content: ''
    }
  },

  handleChange: function() {
    this.setState({
      content: this.refs.content.getValue()
    });
  },

  _onSubmit: function(e) {
    e.preventDefault();
    this.refs.content.value = '';

    WebAPIUtils.createPost(this.state.content);
  },

  render: function() {
    return(
      <Panel>
        <form onSubmit={this._onSubmit}>
          <Input type="textarea" ref="content" placeholder="What's on your mind?" onChange={this.handleChange}/>
          <ButtonInput type="submit" bsStyle="primary" value="Share" disabled={!this.state.content}/>
        </form>
      </Panel>
    );
  }

});

module.exports = CreatePost;
