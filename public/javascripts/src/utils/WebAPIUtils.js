var ServerActionCreators = require('../actions/ServerActionCreators.jsx');
var FeedActionCreators = require('../actions/FeedActionCreators.jsx');
var LoungeConstants = require('../constants/LoungeConstants.js');
var request = require('superagent');

var APIEndpoints = LoungeConstants.APIEndpoints;

module.exports = {

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
          console.log(error);
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
          console.log(error);
        } else {
          json = JSON.parse(res.text);
          if (json.error) {
            ServerActionCreators.receiveLogin(null, json.error);
          } else {
            ServerActionCreators.receiveLogin(json, null);
          }
        }
      })
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
          console.log(error);
        }
        FeedActionCreators.loadPosts();
      })
  },

  loadPosts: function(limit, lastTimestamp) {
    request.get(APIEndpoints.POSTS + "?limit=" + limit + "&lastTimestamp=" + lastTimestamp)
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receivePosts(json, null);
        }
      })
  }

}
