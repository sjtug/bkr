var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var app = require('../app').app;

var AddBookView = Backbone.View.extend({
  add: function(cbk) {
    console.log("render add book");
    app.prompt("请输入图书ISBN号：", "添加图书", function(isbn){
      cbk(isbn);
    });
  }
});

module.exports = AddBookView;
