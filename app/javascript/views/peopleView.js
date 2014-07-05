var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");
var User = require("../user");
var app = require("../app").app;
var Yoo = require("../yoo");


var PeopleView = Backbone.View.extend({
  tags:"div",
  className : "popup",
  otheruser : null,
  template: _.template($('#tmpl-people-view').html()),
  render: function(data) {
    var ts = this;
  	User.getUser(data.username, function(result){
  		otheruser = result;
      data.avatar = User.avatar(120, result);
      ts.$el.html(ts.template(data));
  	}, function(error){
  		app.alert("", error);
  	});  
  }, 
  events : {
  	"click #sayyo" : 'yofunction'
  }, 
  yofunction : function(){
  	Yoo.yoo(otheruser);
  }
})

module.exports = PeopleView;
