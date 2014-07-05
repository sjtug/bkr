var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var BookView = Backbone.View.extend({
  template: _.template($('#tmpl-book-view').html()),
  render: function(data) {
    var bookmanage = require("../bookmanage");
    var ts = this;
    bookmanage.fetchBookInfo(data.isbn, function(bookjson) {
      data.bookjson = bookjson;
      ts.$el.html(ts.template(data))
    });
  }
})

module.exports = BookView;
