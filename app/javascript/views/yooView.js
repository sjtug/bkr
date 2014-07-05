var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var YooView = Backbone.View.extend({
  template: _.template($('#tmpl-yoo-view').html()),
  render: function() {
    this.$el.html(this.template())
  },
  trigger: function() {
    // this tab has been triggered
    // this.render()
    console.log('yoo trigger');
  }
})

module.exports = YooView;
