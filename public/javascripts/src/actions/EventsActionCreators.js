var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');

var ActionTypes = LoungeConstants.ActionTypes;

var EventsActionCreators = {

  toggleCreateEvent: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_CREATE_EVENT
    });
  }

}

module.exports = EventsActionCreators;
