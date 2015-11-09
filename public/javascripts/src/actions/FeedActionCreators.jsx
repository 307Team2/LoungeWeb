var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');

var ActionTypes = LoungeConstants.ActionTypes;

FeedActionCreators = {

  loadPosts: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.LOAD_POSTS
    })
  }
}

module.exports = FeedActionCreators;
