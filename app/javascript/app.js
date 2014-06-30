// app.js
require("framework7");

var _ = require("underscore");
var Backbone = require("backbone");

var myApp = new Framework7({
  swipePanel: 'left',
  animateNavBackIcon: true
});
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});
