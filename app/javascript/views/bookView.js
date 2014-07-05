var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");
var App = require('../app');

var BookView = Backbone.View.extend({
  template: _.template($('#tmpl-book-view').html()),
  render: function(data) {
    var bookmanage = require("../bookmanage");
    var ts = this;
    bookmanage.fetchBookInfo(data.isbn, function(bookjson) {
      data.bookjson = bookjson;
      var succ_cbk = function (result) {
        App.app.hideIndicator();
        App.app.alert("图书添加成功", "添加成功");
      };
      var fail_cbk = function (result) {
        App.app.hideIndicator();
        App.app.alert("图书添加失败", "添加失败");
      };
        
      data.addThisBook = function() {
        App.app.showIndicator();
        bookmanage.addBook(data.isbn, bookjson, succ_cbk, fail_cbk);
      };
      ts.$el.html(ts.template(data))
    });
  }
})

module.exports = BookView;
