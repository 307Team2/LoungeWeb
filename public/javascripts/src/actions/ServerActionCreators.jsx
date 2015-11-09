var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');

var ActionTypes = LoungeConstants.ActionTypes;

module.exports = {

  receiveLogin: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    })
  },

  receivePosts: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_POSTS,
      json: json,
      errors: errors
    })
  },

  receiveProfileData: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_PROFILE_DATA,
      json: json,
      errors: errors
    })
  }

}