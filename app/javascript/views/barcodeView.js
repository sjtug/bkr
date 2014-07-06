var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var App = require('../app');
var barcode = require("../lib/barcode");

var BarcodeView = Backbone.View.extend({
  scan: function(success) {
    var bookmanage = require("../bookmanage");
    console.log("render scan barcode");

    barcode.scan(
      function(result){
      if(result.cancelled == 0) {
          if(result.format != "EAN_13") {
              App.app.alert("错误的图书条码", "扫描错误");
          } else {
               success(result.text);
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
