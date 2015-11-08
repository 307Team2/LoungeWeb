var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var createHistory = require('history').createHistory;

var Lounge = require('./components/lounge.jsx');
var Home = require('./components/home.jsx');
var Signup = require('./components/session/signup.jsx');
var Login = require('./components/session/login.jsx');
var Feed = require('./components/feed/Feed.jsx');

var history = createHistory();

ReactDOM.render((
  <Router history={history}>
    <Route path='/' component={Lounge}>
      <IndexRoute component={Home} />
      <Route path='signup' component={Signup} />
      <Route path='login' component={Login} />
      <Route path='feed' component={Feed} />
    </Route>
  </Router>
), document.getElementById('example'));
