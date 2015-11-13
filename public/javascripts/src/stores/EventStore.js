var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = LoungeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _event = null;
var _errors = [];

var EventStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getEvent: function() {
    return _event;
  }

});

EventStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.RECEIVE_EVENT:
      if (payload.json) {
        _event = payload.json.event;
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      EventStore.emitChange();
      break;

  }

  return true;

});

module.exports = EventStore;
