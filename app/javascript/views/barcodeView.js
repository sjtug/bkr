var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var App = require('../app');
var barcode = require("../lib/barcode");

var BarcodeView = Backbone.View.extend({
  render: function() {
    var bookmanage = require("../bookmanage");
    console.log("render scan barcode");
    barcode.scan(
      function(result){
      if(result.cancelled == 0) {
          if(result.format != "EAN_13") {
              App.app.alert("错误的图书条码", "扫描错误");
          } else {
              App.app.alert("We got a barcode\n" +
                            "Result: " + result.text + "\n" +
                            "Format: " + result.format + "\n" +
                            "Cancelled: " + result.cancelled, 'bkr');
              var succ_cbk = function (result) {
                  App.app.alert(result, "添加成功");
              }
              var fail_cbk = function (result) {
                  App.app.alert(result, "添加失败");
              }
              bookmanage.addBook(result.text, succ_cbk, fail_cbk);
          }
      }
    },
      function(error) {
        App.app.alert(error, 'bkr');
      }
    );
  },
})

module.exports = BarcodeView;
