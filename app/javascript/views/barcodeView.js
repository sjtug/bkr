var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var App = require('../app');
var barcode = require("../lib/barcode");

var BarcodeView = Backbone.View.extend({
  render: function() {
    console.log("render scan barcode");
    barcode.scan(
      function(result){
      App.app.alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);
    },
      function(error) {
        App.app.alert(error, 'bkr');
      }
    );
  },
})

module.exports = BarcodeView;
