
var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var AboutView = Backbone.View.extend({
  template: _.template($('#tmpl-about-view').html()),
  render: function(data) {
    this.$el.html(this.template({}))
  }
})

module.exports = AboutView;
