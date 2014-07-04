var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var IndexView = Backbone.View.extend({
  $el: $('.view-main'),
  $leftPanel: $('.panel-left'),
  initialize: function(){
    this.$leftPanel.on('opened', this.leftPanelOpened);
    this.$leftPanel.on('closed', this.leftPanelClosed);
  },
  render: function(){
    console.log('render');
  },
  leftPanelOpened: function(){
    console.log('left panel opened');
  },
  leftPanelClosed: function(){
    console.log('left panel closed');
  },
});

module.exports = IndexView;
