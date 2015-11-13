var keyMirror = require('keymirror');

var APIRoot = process.env.API_ROOT;

var LoungeConstants = {

  APIEndpoints: {

    // Session
    LOGIN:             APIRoot + "/account/login",
    SIGNUP:            APIRoot + "/account/signup",

    // Feed
    POSTS:             APIRoot + "/posts/all",
    CREATE_POST:       APIRoot + "/posts/create",

    // Account
    ACCOUNT_DATA:      APIRoot + "/account/data",
    CREATE_MEMBERSHIP: APIRoot + "/membership/create",
    UPDATE_MEMBERSHIP: APIRoot + "/membership/update",
    CANCEL_MEMBERSHIP: APIRoot + "/membership/cancel",

    // Profile
    PROFILE:        APIRoot + "/profile/",

    // Events
    EVENTS:            APIRoot + "/events/all",
    CREATE_EVENT:      APIRoot + "/events/create"

  },

  ActionTypes: keyMirror({

    // Session
    LOGIN_REQUEST: null,
    RECEIVE_LOGIN: null,
    LOGOUT: null,
    TOGGLE_STRIPE_MODAL: null,

    // Feed
    RECEIVE_POSTS: null,
    RECEIVE_CREATED_POST: null,

    // Account
    RECEIVE_ACCOUNT_DATA: null,
    LOAD_ACCOUNT_DATA: null,

    // Events
    RECEIVE_EVENTS: null,
    RECEIVE_CREATED_EVENT: null,
    TOGGLE_CREATE_EVENT: null

  })

}

module.exports = LoungeConstants;
