var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');

var ActionTypes = LoungeConstants.ActionTypes;

var ServerActionCreators = {

  receiveLogin: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_LOGIN,
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

  receiveCreatedPost: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_CREATED_POST,
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
  },

  receiveProfileData: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_PROFILE_DATA,
      json: json,
      errors: errors
    });
  },

  receiveEvents: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_EVENTS,
      json: json,
      errors: errors
    });
  },

  receiveCreatedEvent: function(json, errors) {
    AppDispatcher.dispatch({
      type: ActionTypes.RECEIVE_CREATED_EVENT,
      json: json,
      errors: errors
    });
  }

}

module.exports = ServerActionCreators;
