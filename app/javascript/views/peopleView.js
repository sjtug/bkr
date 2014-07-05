var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");
var User = require("../user");
var app = require("../app").app;
var Yoo = require("../yoo");


var PeopleView = Backbone.View.extend({
  template: _.template($('#tmpl-people-view').html()),
  render: function(data) {
    var ts = this;
    var bookmanage = require('../bookmanage');
  	User.getUser(data.username, function(result){
      otheruser = result;
      data.avatar = User.avatar(120, result);
      AV.GeoPoint.current(function(currentLocation) {
        bookmanage.listBookByUser(
          otheruser,
          function(results){
            data.books = _.map(results, function(r){
              var rs = r.get('detail');
              if (currentLocation) {
                var distance = r.get('location').kilometersTo(currentLocation);
                if (distance < 0.1) rs.distance = '<0.1';
                else if(distance > 10) rs.distance = '>10';
                else rs.distance = Math.round(distance*10)/10;
              }
              return rs;
            });
            yooed(otheruser, function(times, binary){
              ts.$el.html(ts.template(data));
            }, function(error){
              console.log(error);
            })          
          });
      });
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
