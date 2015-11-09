var keyMirror = require('keymirror');

var APIRoot = process.env.API_ROOT || "http://localhost:3000";

var LoungeConstants = {

  APIEndpoints: {

    // Session
    LOGIN:          APIRoot + "/account/login",
    SIGNUP:         APIRoot + "/account/signup",

    // Feed
    POSTS:          APIRoot + "/posts/all",
    CREATE_POST:    APIRoot + "/posts/create"

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

module.exports = LoungeConstants;
