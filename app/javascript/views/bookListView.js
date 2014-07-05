var $ = require("jquery");
var _ = require("underscore");

var geoCoding = require("../geocoding");
var Backbone = require("backbone");


var BookListView = Backbone.View.extend({
  template: _.template($('#tmpl-book-list-view').html()),
  render: function() {
    var data={};
    var ts = this;
    var bookmanage = require('../bookmanage');     
    bookmanage.listBookByUser(
      AV.User.current(),
      function(results){
        data.books = _.map(results, function(r){
          var rs = r.get('detail');
          if(r.get("streetname")){
            rs.streetname = r.get("streetname").city+" "+r.get("streetname").street;
          }
          return rs;
        });
        ts.$el.html(ts.template(data));
      });
    
  },
  trigger: function() {
    // this tab has been triggered
    Nihiue_test=require("../bookmanage");
    this.render()
    console.log('booklist trigger');
  }
})

module.exports = BookListView;
