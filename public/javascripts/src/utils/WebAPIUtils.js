var SessionActionCreators = require('../actions/SessionActionCreators.jsx');
var ServerActionCreators = require('../actions/ServerActionCreators.jsx');
var LoungeConstants = require('../constants/LoungeConstants.js');
var request = require('superagent');

var APIEndpoints = LoungeConstants.APIEndpoints;

var WebAPIUtils = {

  signup: function(email, firstName, lastName, age, location, organization, jobTitle, password, photoUrl) {
    request.post(APIEndpoints.SIGNUP)
      .send({
        email: email,
        firstName: firstName,
        lastName: lastName,
        age: age,
        location: location,
        organization: organization,
        jobTitle: jobTitle,
        password: password,
        photoUrl: photoUrl,
        isAdmin: false
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
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receivePosts(json, null);
        }
      });
  },

  loadAccountData: function(closeStripeModal) {
    request.get(APIEndpoints.ACCOUNT_DATA)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        }
        json = JSON.parse(res.text);
        if (closeStripeModal) {
          ServerActionCreators.receiveAccountDataAndCloseStripe(json, null);
        } else {
          ServerActionCreators.receiveAccountData(json, null);
        }
      });
  },

  updateMembershipTier: function(tier) {
    request.post(APIEndpoints.UPDATE_MEMBERSHIP)
      .send({
        tier: tier
      })
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        }
        WebAPIUtils.loadAccountData();
      });
  },

  cancelMembershipTier: function() {
    request.post(APIEndpoints.CANCEL_MEMBERSHIP)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        }
        WebAPIUtils.loadAccountData();
      });
  },

  createMembershipTier: function(tier, stripeToken) {
    request.post(APIEndpoints.CREATE_MEMBERSHIP)
      .send({
        tier: tier,
        stripeToken: stripeToken
      })
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        }
        WebAPIUtils.loadAccountData(true);
      });
  },

  loadEvents: function() {
    request.get(APIEndpoints.EVENTS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveEvents(json, null);
        }
      });
  },

  loadEvent: function(eventId) {
    console.log(eventId);
    request.get(APIEndpoints.EVENTS_BASE + eventId)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveEvent(json, null);
        }
      });
  },

  createEvent: function(title, description, startDate) {
    request.post(APIEndpoints.CREATE_EVENT)
      .send({
        title: title,
        description: description,
        startDate: startDate
      })
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        } else {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveCreatedEvent(json, null);
        }
      });
  },

  rsvpToEvent: function(eventId, rsvp) {
    request.post(APIEndpoints.EVENTS_BASE + eventId + "/rsvp")
      .send({
        rsvp: rsvp
      })
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (error) {
          console.error(error);
        } else {
          json = JSON.parse(res.text);
          WebAPIUtils.loadEvents();
        }
      });
  },

  loadProfileData: function(id) {
    request.get(APIEndpoints.PROFILE + id)
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveProfileData(json, null);
        }
      })
  },

  loadProfileData: function(id) {
    request.get(APIEndpoints.PROFILE + id)
      .set('Accept', 'application/json')
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveProfileData(json, null);
        }
      })
  },

  loadUsers: function() {
    request.get(APIEndpoints.USERS)
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.receiveUsers(json, null);
        }
      });
  },

  deleteUser: function(username) {
    request.del(APIEndpoints.DELETE_USER)
      .send({
        username: username
      })
      .set('Accept', 'application/json')
      .set('Authorization', sessionStorage.getItem('accessToken'))
      .end(function(error, res) {
        if (res) {
          json = JSON.parse(res.text);
          ServerActionCreators.deleteUser(json, null);
        }
      });
  }

}

module.exports = WebAPIUtils;
