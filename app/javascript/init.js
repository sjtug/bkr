var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("underscore");

var config = require("./config");
var app = require("./app").app;
var router = require("./router");

_.once(function(){
  // init av
  AV.initialize(config.av.key, config.av.secret);

  // init navigate by link
  $(document).on("click", "a.link, *.item-link", function(evt) {
    var href = $(this).attr("href");
    if(href[0]=='#') Backbone.history.navigate(href, true);
    else window.location = href;
  });

  // init backbone
  Backbone.$ = $;
  Backbone.history.start();
})();
