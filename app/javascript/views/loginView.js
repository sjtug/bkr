var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("../user");
var app = require("../app").app;

var LoginView = Backbone.View.extend({
	initialize : function(){
		this.render();
	},
	popup : function(){
		console.log(this.$el.html());
		app.popup('<div class="popup">'+this.$el.html()+'</div>');
	},
	render : function(){
		// console.log($('#tmpl-login').html());
		this.$el.html($('#tmpl-login').html());
		// console.log(this.$el.html());
	}
});

module.exports = LoginView;