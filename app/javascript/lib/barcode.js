try {
  console.log(cordova.plugins)
  var scan = cordova.plugins.barcodeScanner.scan;
} catch (e) {
  var scan = function(success, fail) {
    console.log("Calling barscan code out of cordova enviroment!")
    fail(e);
  }
}

exports.scan = scan;
