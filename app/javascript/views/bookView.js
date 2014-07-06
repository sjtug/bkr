var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");
var App = require('../app');

var BookView = Backbone.View.extend({
  template: _.template($('#tmpl-book-view').html()),
  initialize: function(){
    this.bookmanage = require("../bookmanage");
  },
  render: function(data) {
    var ts = this;
    this.bookmanage.fetchBookInfo(data.isbn, function(bookjson) {
      data.bookjson = bookjson;
      ts.isbn = data.isbn;
      ts.bookjson = data.bookjson;
      ts.$el.html(ts.template(data))
    });
  },
  events: {
    'click #markbook' : 'markThisBook',
    'click .image' : 'toggleImageSize',
  },
  markThisBook: function() {
    var ts = this;
    var succ_cbk = function (result) {
      console.log('success');
      App.app.hideIndicator();
      App.app.alert("图书添加成功", "添加成功");
    };
    var fail_cbk = function (result) {
      console.log(result);
      App.app.hideIndicator();
      App.app.alert("图书添加失败", "添加失败");
    };
    App.app.showIndicator();
    this.bookmanage.addBook(ts.isbn, ts.bookjson, succ_cbk, fail_cbk);
  },
  toggleImageSize: function() {
    this.$('.image').toggleClass('big');
  }
});

module.exports = BookView;
