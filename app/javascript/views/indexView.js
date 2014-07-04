var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var user = require('../user');

var IndexView = Backbone.View.extend({
  $el: $('.view-main'),
  $leftPanel: $('.panel-left'),
  leftPanelTemplate: _.template($('#tmpl-left-side-menu').html()),
  initialize: function(){
    this.$leftPanel.on('opened', this.leftPanelOpened);
    this.$leftPanel.on('closed', this.leftPanelClosed);
  },
  render: function(){
    var avatar = user.avatar();
    var username = user.current().get("username");
    this.$leftPanel.html(this.leftPanelTemplate({avatar:avatar, username:username}));
  },
  leftPanelOpened: function(){
    console.log('left panel opened');
  },
  leftPanelClosed: function(){
    console.log('left panel closed');
  },
});

module.exports = IndexView;
