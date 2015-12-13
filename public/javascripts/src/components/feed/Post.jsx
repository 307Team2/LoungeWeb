var React = require('react');
var moment = require('moment');

var Panel = require('react-bootstrap/lib/Panel');
var Comments = require('./Comments.jsx');
var Link = require('react-router').Link;

var Post = React.createClass({

  displayComments: function() {
    console.log('wat');
  },

  render: function() {
    return (
      <div className="post-panel">
        <Panel>
          <p className="post-content">{this.props.post.content}</p>
          <p className="post-metadata">Submitted by <Link to={"/user/" + this.props.post.authorId}>{this.props.post.displayName}</Link> {moment(this.props.post.createdAt).fromNow()}</p>
        </Panel>
        <div className="panel-comments">
          <Comments postId={this.props.post._id} comments={this.props.post.comments} />
        </div>
      </div>
    );
  }
});

module.exports = Post;
