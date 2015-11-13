var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');

var ActionTypes = LoungeConstants.ActionTypes;

var EventsActionCreators = {

  toggleCreateEvent: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.TOGGLE_CREATE_EVENT
    });
  },

  changeFilter: function(tier) {
    AppDispatcher.dispatch({
      type: ActionTypes.CHANGE_FILTER,
      tier: tier
    });
  }

}

module.exports = EventsActionCreators;
