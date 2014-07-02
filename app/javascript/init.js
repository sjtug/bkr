var _ = require("underscore");

var config = require("./config");
var app = require("./app");

_.once(function(){
  AV.initialize(config.av.key, config.av.secret);
});
