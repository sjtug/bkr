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
		"change #username" : "changename",
		"click #signup" : "test"
	},
	changename : function(){
		console.log("username changed");
	},
	test : function(){
		console.log("clicked");
	}

});

module.exports = LoginView;