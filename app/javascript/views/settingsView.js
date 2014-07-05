var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("../user");
var app = require("../app").app;

var SettingsView = Backbone.View.extend({
	template : _.template($("#tmpl-settings-view").html()),
	render : function(data){
		this.$el.html(this.template(data));
		console.log(this.$el);
	},
	events : {
		"click #change" : "changepassword", 
		"click #reset" : "reset"
	}, 
	reset : function(){
		this.$el.find("#oldpassword").val("");
		this.$el.find("#newpassword").val("");
		this.$el.find("#repassword").val("");
	},
	changepassword : function(){
		User.changePassword(this.$el.find("#oldpassword").val(),
			this.$el.find("#newpassword").val(), this.$el.find("#repassword").val(),
			function(){
				app.alert("密码修改成功！","恭喜");
			}, function(error){
				app.alert(error, "修改失败");
			})
	}
});

module.exports = SettingsView;
