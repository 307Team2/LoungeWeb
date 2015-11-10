var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var LoungeConstants = require('../constants/LoungeConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = LoungeConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _posts = [];
var _lastTimestamp = Date.now();
var _limit = 10;
var _errors = [];
var _isMorePosts = true;

var FeedStore = assign({}, EventEmitter.prototype, {
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllPosts: function() {
    return _posts;
  },
  
  getLimit: function() {
    return _limit;
  },

  getLastTimestamp: function() {
    return _lastTimestamp;
  },

  isMorePosts: function() {
    return _isMorePosts;
  }

});

FeedStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.RECEIVE_POSTS:
      if (payload.json) {
        if (!payload.json.posts.length) {
          _isMorePosts = false;
        }
        _posts = _posts.concat(payload.json.posts);
        _lastTimestamp = _posts[_posts.length - 1].createdAt || Date.now();
      }
      if (payload.errors) {
        _errors = payload.errors;
      }
      FeedStore.emitChange();
      break;

    case ActionTypes.LOAD_POSTS:
      _posts = [];
      _lastTimestamp = Date.now();
      WebAPIUtils.loadPosts(_limit, _lastTimestamp);
      break;

  }

  return true;

});

module.exports = FeedStore;
