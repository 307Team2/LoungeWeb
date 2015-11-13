var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = LoungeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _events = [];
var _errors = [];
var _filter = null; // TODO: fetch tier?
var _createEvent = false;

var EventsStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllEvents: function() {
    return _events;
  },

  getFilter: function() {
    return _filter;
  },

  isCreateEvent: function() {
    return _createEvent;
  }

});

EventsStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.RECEIVE_EVENTS:
      if (payload.json) {
        _events = payload.json.events;
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      EventsStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_EVENT:
      if (payload.json) {
        _events.unshift(payload.json.event);
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      _createEvent = false;
      EventsStore.emitChange();
      break;

    case ActionTypes.TOGGLE_CREATE_EVENT:
      _createEvent = !_createEvent;
      EventsStore.emitChange();
      break;

    case ActionTypes.CHANGE_FILTER:
      _filter = payload.tier;
      EventsStore.emitChange();
      break;

  }

  return true;

});

module.exports = EventsStore;
