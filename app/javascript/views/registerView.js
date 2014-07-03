var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("../user");
var app = require("../app").app;

var RegisterView = Backbone.View.extend({
	tag : "div",
	className : "popup",
	initialize : function(){
		this.render();
		$("body").append(this.$el);
	},
	popup : function(){
		app.popup(this.$el);
	},
	render : function(){
		this.$el.html($('#tmpl-register').html());
	},
	events : {
		"change #username" : "checkname",
		"change #email" : "checkmail",
		"click #signup" : "signup",
		"click #reset" : "reset"
	},
	checkname : function(){
		User.validateUser($("#username").val(), function(){

		})
	},
	checkmail : function(){

	},
	signup : function(){

	},
	reset : function(){
		
	}
});

module.exports = RegisterView;