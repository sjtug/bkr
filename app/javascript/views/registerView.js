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
    var ts = this;
    User.validateUser(this.$el.find("#username").val(), function(){
      console.log(this);
      ts.$el.find("#username-info").html("<i class='icon icon-f7 ion-checkmark-round'></i>");
    }, function(error){
      ts.$el.find("#username-info").html("<i class='icon icon-f7 ion-close-round' title='"+error+"'></i>");
    })
  },
  checkmail : function(){
    var ts = this;
    User.validateEmail(this.$el.find("#email").val(), function(){
      ts.$el.find("#email-info").html("<i class='icon icon-f7 ion-checkmark-round'></i>");
    }, function(error){
      ts.$el.find("#email-info").html("<i class='icon icon-f7 ion-close-round' title='"+error+"'></i>");
    })
  },
  signup : function(){
    var ts = this;
    User.register(this.$el.find("#username").val(), this.$el.find("#password").val(), this.$el.find("#email").val(), function(){
      app.closeModal(ts.$el);
    }, function(error){
      console.log(error);
      app.alert(error, "注册失败");
    });
  },
  reset : function(){
    this.$el.find("#username").val("");
    this.$el.find("#password").val("");
    this.$el.find("#email").val("");
  }
});

module.exports = RegisterView;