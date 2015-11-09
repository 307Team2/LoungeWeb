var React = require('react');
var History = require('react-router').History;
var WebAPIUtils = require('../../utils/WebAPIUtils.js');


var CreatePost = React.createClass({

  mixins: [ History ],

  _onSubmit: function(e) {
    e.preventDefault();
    var content = this.refs.content.value;
    this.refs.content.value = "";

    WebAPIUtils.createPost(content);
  },

  render: function() {
    return(
      <div className="panel new-post">
        <div className="panel-heading">
          <h3 className="panel-title">Create a new post</h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this._onSubmit}>
            <div className="form-group">
              <textarea type="text" className="form-control" id="createNewPostContent" ref="content" placeholder="What's on your mind?" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = CreatePost;
