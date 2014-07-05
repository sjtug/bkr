var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var User = require("../user");
var app = require("../app").app;

var SettingsView = Backbone.View.extend({
	template : _.template($("#tmpl-settings-view").html()),
	render : function(data){
		data.user = User.current();
		this.$el.html(this.template(data));
		console.log(this.$el);
	},
	events : {
		"click #change" : "changepassword", 
		"click #reset" : "reset",
		"click #save" : "save"
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
	},
	save : function(){
		var user = User.current();
		user.set("realname", this.$el.find("#realname").val());
		user.set("telephone", this.$el.find("#telephone").val());
		user.set("qqnumber", this.$el.find("#qqnumber").val());
		user.set("wxnumber", this.$el.find("#wxnumber").val());
		user.save(null, {
			success : function(user){
				app.alert("修改成功", "基本信息");
			}, 
			error : function(user, error){
				app.alert("修改失败","基本信息");
			}
		});
	}
});

module.exports = SettingsView;
