var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var BookView = Backbone.View.extend({
  template: _.template($('#tmpl-book-view').html()),
  render: function(data) {
    this.$el.html(this.template(data))
  }
})

module.exports = BookView;
