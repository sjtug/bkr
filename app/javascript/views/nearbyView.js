var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var NearbyView = Backbone.View.extend({
  template: _.template($('#tmpl-nearby-view').html()),
  render: function() {
    this.$el.html(this.template())
  },
  trigger: function() {
    // this tab has been triggered
    // this.render()
    console.log('nearby trigger');
  }
})

module.exports = NearbyView;
