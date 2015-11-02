var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = LoungeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _accessToken = sessionStorage.getItem('accessToken');
var _user = null;
if (sessionStorage.user) {
  _user = JSON.parse(sessionStorage.user);
}
var _errors = [];

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

  getUser: function() {
    return _user;
  },

  getErrors: function() {
    return _errors;
  }

});

SessionStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.LOGIN_RESPONSE:
      if (payload.json && payload.json.token) {
        _accessToken = payload.json.token;
        _user = payload.json.user;
        sessionStorage.setItem('accessToken', _accessToken);
        sessionStorage.setItem('user', JSON.stringify(_user));
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      SessionStore.emitChange();
      break;

    case ActionTypes.LOGOUT:
      _accessToken = null;
      _email = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('user');
      SessionStore.emitChange();
      break;
  }

  return true;

});

module.exports = SessionStore;
