// app.js

var app = new Framework7({
  swipePanel: 'left',
  animateNavBackIcon: true
});
var mainView = app.addView('.view-main', {
  dynamicNavbar: true
});

exports.app = app;
exports.mainView = mainView;

