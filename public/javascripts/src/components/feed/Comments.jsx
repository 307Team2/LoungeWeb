var React = require('react');
var moment = require('moment');
var _ = require('lodash');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');

// var Panel = require('react-bootstrap/lib/Panel');
var Link = require('react-router').Link;
var Input = require('react-bootstrap/lib/Input');
var ButtonInput = require('react-bootstrap/lib/ButtonInput');

var Comments = React.createClass({

  getInitialState: function() {
    return {
      showComments: false,
      content: ''
    }
  },

  toggleComments: function() {
    this.setState({
      showComments: !this.state.showComments
    });
  },

  renderComments: function() {
    return _.map(this.props.comments, function(comment) {
      return (
        <li className="comment" key={comment._id}>
          <p className="comment-content">{comment.content}</p>
          <p className="comment-author">Submitted by <Link to={"/user/" + comment.authorId}>{comment.displayName}</Link></p>
        </li>
      );
    })
  },

  handleChange: function() {
    this.setState({
      content: this.refs.content.getValue()
    });
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.refs.content.value = '';

    WebAPIUtils.createComment(this.state.content, this.props.postId);
  },

  render: function() {
    if (this.state.showComments) {
      return (
        <div>
          <ul className="comment-list">
            {this.renderComments()}
          </ul>
          <form onSubmit={this.onSubmit}>
            <Input type="text" ref="content" placeholder="Write a response" onChange={this.handleChange}/>
            <ButtonInput type="submit" bsStyle="primary" value="Share" disabled={!this.state.content}/>
          </form>
        </div>
      );
    } else {
      return (
        <a onClick={this.toggleComments}>View comments</a>
      );
    }
  }
});

module.exports = Comments;
