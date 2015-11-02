var keyMirror = require('keymirror');

var APIRoot = "http://localhost:3000";

module.exports = {

  APIEndpoints: {
    LOGIN:          APIRoot + "/account/login",
    SIGNUP:         APIRoot + "/account/signup",
  },

  ActionTypes: keyMirror({

    // Session
    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,
    LOGOUT: null

  })

}