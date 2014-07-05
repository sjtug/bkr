var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var app = require('../app').app;

var AddBookView = Backbone.View.extend({
  render: function() {
    console.log("render add book");
    app.prompt("请输入图书ISBN号：", "添加图书", function(isbn){
      app.alert("ISBN号为："+isbn);
    });
  }
});

module.exports = AddBookView;