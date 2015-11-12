var React = require('react');
var WebAPIUtils = require('../../utils/WebAPIUtils.js');
var FeedStore = require('../../stores/FeedStore.js');
var Post = require('./Post.jsx');
var CreatePost = require('./CreatePost.jsx');

var getStateFromStores = function() {
  return {
    posts: FeedStore.getAllPosts(),
    limit: FeedStore.getLimit(),
    lastTimestamp: FeedStore.getLastTimestamp(),
    isMorePosts: FeedStore.isMorePosts()
  };
}

var Feed = React.createClass({
  
  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    FeedStore.addChangeListener(this._onChange);
    WebAPIUtils.loadPosts(this.state.limit, this.state.lastTimestamp);
  },

  componentWillUnmount: function() {
    FeedStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  loadMorePosts: function() {
    WebAPIUtils.loadPosts(this.state.limit, this.state.lastTimestamp);
  },

  renderPosts: function() {
    var posts = this.state.posts.map(function(post, index) {
      return <Post key={post._id} post={post}/>
    });
    return(
      <div className="posts">
        {posts}
      </div>
    );
  },

  renderLoadMorePosts: function() {
    if (this.state.isMorePosts) {
      return(<button className="btn btn-default" onClick={this.loadMorePosts}>Load more posts</button>);
    } else {
      return(<p>No more posts.</p>);
    }
  },

  render: function() {
    return (
      <div className="feed">
        <CreatePost />
        {this.renderPosts()}
        {this.renderLoadMorePosts()}
      </div>
    );
  }
});

module.exports = Feed;
