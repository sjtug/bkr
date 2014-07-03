var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("underscore");

var config = require("./config");
var app = require("./app").app;
var LoginView = require("./views/loginView");

_.once(function(){
	// init backbone
	Backbone.$ = $;

	// init av
  AV.initialize(config.av.key, config.av.secret);


  if(!AV.User.current()){   
    var loginview = new LoginView();
    loginview.popup();
  }else{
    console.log(AV.User.current().get("username"));
  }
})();
