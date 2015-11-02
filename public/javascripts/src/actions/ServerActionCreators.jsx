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
  }
}