var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000";

module.exports = {

  APIEndpoints: {

    // Session
    LOGIN:          APIRoot + "/account/login",
    SIGNUP:         APIRoot + "/account/signup",

    // Feed
    POSTS:          APIRoot + "/posts/all",
    CREATE_POST:    APIRoot + "/posts/create",

    // Profile
    PROFILE:        APIRoot + "/profile/"

  },

  ActionTypes: keyMirror({

    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT: null,

    // Feed
    RECEIVE_POSTS: null,
    LOAD_POSTS: null

  })

}