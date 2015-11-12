var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');

var ActionTypes = LoungeConstants.ActionTypes;

var ServerActionCreators = {

  receiveLogin: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  },

  receivePosts: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_POSTS,
      json: json,
      errors: errors
    });
  },

  receiveAccountData: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_ACCOUNT_DATA,
      json: json,
      errors: errors
    });
  }

}

module.exports = ServerActionCreators;
