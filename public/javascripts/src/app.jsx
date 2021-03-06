var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var createHistory = require('history').createHistory;

var Lounge = require('./components/Lounge.jsx');
var Home = require('./components/Home.jsx');
var Signup = require('./components/session/Signup.jsx');
var Login = require('./components/session/Login.jsx');
var Feed = require('./components/feed/Feed.jsx');
var Account = require('./components/account/Account.jsx');
var Profile = require('./components/profile/Profile.jsx');
var Events = require('./components/events/Events.jsx');
var Event = require('./components/event/Event.jsx');
var Admin = require('./components/admin/Admin.jsx');

var history = createHistory();

ReactDOM.render((
  <Router history={history}>
    <Route path='/' component={Lounge}>
      <IndexRoute component={Home} />
      <Route path='signup' component={Signup} />
      <Route path='login' component={Login} />
      <Route path='feed' component={Feed} />
      <Route path='account' component={Account} />
      <Route path='/user/:userId' component={Profile} />
      <Route path='/admin' component={Admin} />
      <Route path='events' component={Events} />
      <Route path='events/:eventId' component={Event} />
    </Route>
  </Router>
), document.getElementById('example'));
