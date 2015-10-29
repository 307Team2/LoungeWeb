var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Lounge = require('./components/lounge.jsx');

// module.exports = (
// );
module.exports = Router.create({
  routes: (
    <Route name='lounge' path='/' handler={Lounge}>
    </Route>
  ),
  location: null
});