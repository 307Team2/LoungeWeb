var React = require('react');
var moment = require('moment');

var Post = React.createClass({

  render: function() {
    return (
      <div className="panel post">
        <div className="panel-body">
          <p className="post-content">{this.props.post.content}</p>
          <p className="post-metadata">
            <a href={"/" + this.props.post.authorId}>{this.props.post.displayName}</a> • <a href="#">{moment(this.props.post.createdAt).fromNow()}</a>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = Post;
