var $ = require("jquery");
var _ = require("underscore");

var Backbone = require("backbone");

var BookListView = Backbone.View.extend({
  template: _.template($('#tmpl-book-list-view').html()),
  render: function() {
    this.$el.html(this.template())
  },
  trigger: function() {
    // this tab has been triggered
    // this.render()
    console.log('booklist trigger');
  }
})

module.exports = BookListView;
