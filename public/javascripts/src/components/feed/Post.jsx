var React = require('react');
var moment = require('moment');

var Panel = require('react-bootstrap/lib/Panel');
var Link = require('react-router').Link;

var Post = React.createClass({

  render: function() {
    return (
      <Panel>
        <p className="post-content">{this.props.post.content}</p>
        <p>Submitted by <Link to={"/" + this.props.post.authorId}>{this.props.post.displayName}</Link> {moment(this.props.post.createdAt).fromNow()}</p>
      </Panel>
    );
  }
});

module.exports = Post;
