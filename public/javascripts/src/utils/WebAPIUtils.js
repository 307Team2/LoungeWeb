var ServerActionCreators = require('../actions/ServerActionCreators.jsx');
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
  }

}
