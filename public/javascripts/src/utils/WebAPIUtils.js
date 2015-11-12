var SessionActionCreators = require('../actions/SessionActionCreators.jsx');
var ServerActionCreators = require('../actions/ServerActionCreators.jsx');
var LoungeConstants = require('../constants/LoungeConstants.js');
var request = require('superagent');

var APIEndpoints = LoungeConstants.APIEndpoints;

var WebAPIUtils = {

  signup: function(email, firstName, lastName, age, location, organization, jobTitle, password) {
    request.post(APIEndpoints.SIGNUP)
      .send({
        email: email,
        firstName: firstName,
        lastName: lastName,
        age: age,
        location: location,
        organization: organization,
        jobTitle: jobTitle,
        password: password
      })
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (error) {
          console.error(error);
        } else {
          json = JSON.parse(res.text);
          if (json.error) {
            ServerActionCreators.receiveLogin(null, json.error);
          } else {
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  login: function(email, password) {
    request.post(APIEndpoints.LOGIN)
      .send({
        username: email,
        password: password
      })
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (error) {
          console.error(error);
        } else {
          json = JSON.parse(res.text);
          if (json.error) {
            ServerActionCreators.receiveLogin(null, json.error);
          } else {
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      });
  },

  createPost: function(content) {
    request.post(APIEndpoints.CREATE_POST)
      .send({
        content: content
      })
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        } else {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveCreatedPost(json, null);
        }
      });
  },

  loadPosts: function(limit, lastTimestamp) {
    if (!limit) limit = 10;
    if (!lastTimestamp) lastTimestamp = Date.now();
    request.get(APIEndpoints.POSTS + "?limit=" + limit + "&lastTimestamp=" + lastTimestamp)
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receivePosts(json, null);
        }
      });
  },

  loadAccountData: function() {
    request.get(APIEndpoints.ACCOUNT_DATA)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        }
        json = JSON.parse(res.text);
        ServerActionCreators.receiveAccountData(json, null);
      });
  },

  updateMembershipTier: function(name) {
    request.post(APIEndpoints.UPDATE_MEMBERSHIP)
      .send({
        tier: name
      })
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        }
        WebAPIUtils.loadAccountData();
      });
  }

}

module.exports = WebAPIUtils;
