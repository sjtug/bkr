// app.js

var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var init = require("./init");

var myApp = new Framework7({
  swipePanel: 'left',
  animateNavBackIcon: true
});
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});

_.once(init.initAV);
