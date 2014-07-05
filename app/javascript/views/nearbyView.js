var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var NearbyView = Backbone.View.extend({
  template: _.template($('#tmpl-nearby-view').html()),
  render: function() {
    data={};
    var ts = this;
    var bookmanage = require('../bookmanage');     
    AV.GeoPoint.current(function(currentLocation) {
          bookmanage.listNearBook(
            currentLocation,
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
              ts.$el.html(ts.template(data));    
            });
        });    
  },
  trigger: function() {
    // this tab has been triggered
    this.render()
    console.log('nearby trigger');
  }
})

module.exports = NearbyView;
