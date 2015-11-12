var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');

var ActionTypes = LoungeConstants.ActionTypes;

var SessionActionCreators = {

  logout: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.LOGOUT
    });
  }

}

module.exports = SessionActionCreators;
