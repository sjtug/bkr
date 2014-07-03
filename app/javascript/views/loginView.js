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
		if(this.$el.find("#username").val().length < =3){
			app.alert("用户名长度不能小于3", "登录错误");
			return;
		}
		if(this.$el.find("#password").val().length == 0){
			app.alert("密码不能为空", "登录错误");
			return;
		}
		var ts = this;
		User.login(this.$el.find("#username").val(), this.$el.find("#password").val(), function(){
			app.alert("Welcome");
			app.closeModal(ts.$el);
		}, function(error){
			app.modal({
				title : "登录错误",
				text : error,
				buttons : [
					{
						text : "忘记密码",
						onClick : function(){
							app.prompt("请输入邮箱", "重置密码", function(){}, function(value){
								AV.User.requestPasswordReset(value, {
									success : function(){
										app.addNotification({
											title : "重置密码",
											message : "我们已向您邮箱发送一封邮件，请按照指示进行操作来重置密码"
										})
									}, 
									error : function(){

									}
								})
							})
						}
					},
					{
						text : "确定"
					}
				]
			})
		});
	},
	signup : function(){
		app.closeModal(this.$el);
		var registerView = new RegisterView();
		registerView.popup();
	}

});

module.exports = LoginView;