var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("../user");
var app = require("../app").app;

var LoginView = Backbone.View.extend({
	tag : 'div',
	className : 'popup',
	initialize : function(){
		this.render();
		$("body").append(this.$el);
	},
	popup : function(){
		app.popup(this.$el);
	},
	render : function(){
		this.$el.html($('#tmpl-login').html());
	},
	events : {
		"click #signup" : "signup",
		"click #signin" : "signin"
	},
	signin : function(){
		User.login($("#username").val(), $("#password").val(), function(){
			app.alert("Welcome");
		}, function(error){
			app.alert(error, "登录错误");
		});
	},
	signup : function(){
		console.log("clicked");
	}

});

module.exports = LoginView;