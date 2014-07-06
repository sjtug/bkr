var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");
var User = require("../user");
var App = require("../app");
var Yoo = require("../yoo");


var PeopleView = Backbone.View.extend({
  template: _.template($('#tmpl-people-view').html()),
  render: function(data) {
    this.data = data;
    var ts = this;
    var bookmanage = require('../bookmanage');
  	User.getUser(data.username, function(otheruser){
      data.avatar = User.avatar(120, otheruser);
      ts.otheruser = otheruser;
      AV.GeoPoint.current(function(currentLocation) {
        bookmanage.listBookByUser(ts.otheruser,
          function(results){
            data.is_me = (User.current().get('username') == data.username);
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
            Yoo.yooed(ts.otheruser, function(times){
              data.yoo_times = times;
              data.otheruser = ts.otheruser;
              ts.$el.html(ts.template(data));
              App.app.hideIndicator();
            }, function(error){
              App.app.alert('网络错误', 'bkr');
              App.app.hideIndicator();
            })
          });
      });
    }, function(error){
      App.app.alert("", error);
    });
  }, 
  events : {
    "click #sayyoo" : 'yofunction'
  }, 
  yofunction : function(){
    App.app.showIndicator();
    var ts = this;
    Yoo.yoo(this.otheruser, function() {
      ts.render(ts.data);
    });
  }
})

module.exports = PeopleView;
