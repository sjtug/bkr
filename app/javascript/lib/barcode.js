try {
  var scan = cordova.require("com.phonegap.plugins.barcodescanner.BarcodeScanner").scan;
} catch (e) {
  var scan = function(success, fail) {
    console.log("Calling barscan code out of cordova enviroment!")
    fail(e);
  }
}

exports.scan = scan;
