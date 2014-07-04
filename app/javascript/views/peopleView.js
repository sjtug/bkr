var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");
var User = require("../user");
var app = require("../app")
var Yoo = require("../yoo");


var PeopleView = Backbone.View.extend({
  tags:"div",
  className : "popup",
  otheruser : null,
  template: _.template($('#tmpl-people-view').html()),
  render: function(data) {
  	User.getUser(data.username, function(result){
  		otheruser = result;
  	}, function(error){
  		app.alert("", error);
  	});
    this.$el.html(this.template(data));
  }, 
  events : {
  	"click #sayyo" : 'yofunction'
  }, 
  yofunction : function(){
  	Yoo.yoo(otheruser);
  }
})

module.exports = PeopleView;
