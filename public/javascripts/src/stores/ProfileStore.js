var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = LoungeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _posts = [];
var _data = {};
var _errors = [];

var ProfileStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getProfileData: function() {
    return _data;
  },

  getProfilePosts: function() {
    return _posts;
  }

});

ProfileStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.RECEIVE_PROFILE_DATA:
      if (payload.json) {
        _data = payload.json.user;
        _posts = _posts.concat(payload.json.posts);
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      ProfileStore.emitChange();
      break;

  }

  return true;

});

module.exports = ProfileStore;
