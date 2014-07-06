var $ = require("jquery");
var _ = require("underscore");
var User = require("../user");

var Backbone = require("backbone");

var WhoIsReadingView = Backbone.View.extend({
  template: _.template($('#tmpl-who-is-reading-view').html()),
  timestamp : 0,
  render: function(data) {
    var bookmanage = require("../bookmanage");
  	this.$el.html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
  	var ts = this;
    bookmanage.listUserByBook(
      data.isbn,
      function(results){
        ts.$el.html(ts.template({people: results, avatar: User.avatar}));
      });
  },
})

module.exports = WhoIsReadingView;
