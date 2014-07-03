var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("../user");
var app = require("../app").app;
var RegisterView = require("./registerView");

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
		var ts = this;
		User.login(this.$el.find("#username").val(), this.$el.find("#password").val(), function(){
			app.alert("Welcome");
			app.closeModal(ts.$el);
		}, function(error){
			app.alert(error, "登录错误");
		});
	},
	signup : function(){
		app.closeModal(this.$el);
		var registerView = new RegisterView();
		registerView.popup();
	}

});

module.exports = LoginView;