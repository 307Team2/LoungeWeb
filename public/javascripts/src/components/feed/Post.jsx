var React = require('react');
var moment = require('moment');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var FeedStore = require('../../stores/FeedStore.js');

module.exports = React.createClass({

  render: function() {
    return (
      <div className="panel post">
        <div className="panel-body">
          <p className="post-content">{this.props.post.content}</p>
          <p className="post-metadata">
            <a href={"/user/" + this.props.post.authorId}>{this.props.post.displayName}</a> • <a href="#">{moment(this.props.post.createdAt).fromNow()}</a>
          </p>
        </div>
      </div>
    );
  }
});
