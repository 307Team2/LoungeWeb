var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = LoungeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _accessToken = sessionStorage.getItem('accessToken');
var _errors = [];
var _isStripeOpen = false;
var _tierName = null;

var SessionStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isLoggedIn: function() {
    return _accessToken ? true : false;
  },

  getAccessToken: function() {
    return _accessToken;
  },

  isStripeOpen: function() {
    return _isStripeOpen;
  },

  getTierName: function() {
    return _tierName;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.LOGOUT:
      sessionStorage.removeItem('accessToken');
      _accessToken = null;
      SessionStore.emitChange();
      break;

    case ActionTypes.LOADING:
      SessionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_LOGIN:
      if (payload.json && payload.json.token) {
        _accessToken = payload.json.token;
        sessionStorage.setItem('accessToken', _accessToken);
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.RECEIVE_ACCOUNT_DATA_AND_CLOSE_STRIPE:
    case ActionTypes.TOGGLE_STRIPE_MODAL:
      if (payload.name) {
        _tierName = payload.name;
      }
      _isStripeOpen = !_isStripeOpen;
      SessionStore.emitChange();
      break;


  }

  return true;

});

module.exports = SessionStore;
