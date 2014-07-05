var $ = require("jquery");
var _ = require("underscore");
var Yoo = require("../yoo");
var User = require("../user");

var Backbone = require("backbone");

var YooView = Backbone.View.extend({
  template: _.template($('#tmpl-yoo-view').html()),
  timestamp : 0,
  render: function() {
  	this.$el.html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
  	var ts = this;
  	Yoo.getyoos(0, function(results){
  		var res = ts.clear(results);
  		console.log("res"+res);
  		var data = {};
  		data.yoos = res;
  		data.avatar = User.avatar;
  		ts.$el.html(ts.template(data));
  	}, function(error){
  		console.log(error);
  	});
    // this.$el.html(this.template());
  },
  trigger: function() {
    var date = new Date();
    console.log("triggered");
    if(date.valueOf() - this.timestamp > 60000){
    	this.render();
    	this.timestamp = date.valueOf();
    }
  }, 
  clear : function(results){
  	var username = {};
  	var res = [];
  	for(var i in results){
  		var name = results[i].get("fromUser").get("username");
  		if(name && !username[name]){
  			username[name] = true;
  			res.push(results[i]);
  		}
  	}
  	return res;
  }
})

module.exports = YooView;
