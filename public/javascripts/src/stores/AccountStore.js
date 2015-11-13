var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = LoungeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _user = {};
var _errors = [];

var AccountStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getUser: function() {
    return _user;
  }

});

AccountStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.LOGOUT:
      _user = {};
      AccountStore.emitChange();
      break;

    case ActionTypes.RECEIVE_LOGIN:
      if (payload.json && payload.json.token) {
        _user = payload.json.user;
      }
      AccountStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ACCOUNT_DATA_AND_CLOSE_STRIPE:
    case ActionTypes.RECEIVE_ACCOUNT_DATA:
      if (payload.json) {
        _user = payload.json.user;
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      AccountStore.emitChange();
      break;

    case ActionTypes.LOAD_ACCOUNT_DATA:
      WebAPIUtils.loadAccountData();
      break;

  }

  return true;

});

module.exports = AccountStore;
