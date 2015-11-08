var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');

var ActionTypes = LoungeConstants.ActionTypes;

module.exports = {

  loadPosts: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.LOAD_POSTS
    })
  }
}