var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var ActionTypes = LoungeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _users = [];
var _errors = [];
var _createUser = false;
var _deleteUser = false;

var AdminStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllUsers: function() {
    return _users;
  }

});

AdminStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.RECEIVE_USERS:
      if (payload.json) {
        _users = payload.json;
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      AdminStore.emitChange();
      break;

    case ActionTypes.RECEIVE_CREATED_USER:
      if (payload.json) {
        _users.unshift(payload.json.event);
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      _createEvent = false;
      AdminStore.emitChange();
      break;

    case ActionTypes.DELETE_USER:
      if (payload.json) {
        _.remove(_users, function(user) {
          console.log(user);
          return user.username === payload.json.username;
        })
        // _events.unshift(payload.json.event);
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      _createEvent = false;
      AdminStore.emitChange();
      break;

    case ActionTypes.CREATE_USER:
      console.log('test');
      WebAPIUtils.loadUsers();
      break;

    case ActionTypes.TOGGLE_DELETE_USER:
      _deleteUser = !_deleteUser;
      AdminStore.emitChange();
      break;

  }

  return true;

});

module.exports = AdminStore;
