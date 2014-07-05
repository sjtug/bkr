var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var user = require('../user');
var BookListView = require('./bookListView');
var NearbyView = require('./nearbyView');
var YooView = require('./yooView');

var IndexView = Backbone.View.extend({
  el: $('.view-main').get(0),
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
    this.triggerTab();
  },
  leftPanelOpened: function(){
    console.log('left panel opened');
  },
  leftPanelClosed: function(){
    console.log('left panel closed');
  },
  events: {
    'click .tab-link': 'switchTab',
  },
  switchTab: function(e) {
    var tabName = $(e.currentTarget).attr('href');
    this.triggerTab(tabName);
  },
  triggerTab: function(name) {
    switch (name) {
      case '#books':
        if (!this.bookListView) {
          this.bookListView = new BookListView({el: $('#books').get(0)});
          this.bookListView.user=user.current();
        }
        this.bookListView.trigger();
        break;
      case '#yoo':
        if (!this.yooView) {
          this.yooView = new YooView({el: $('#yoo').get(0)});
          this.yooView.user=user.current();
        }
        this.yooView.trigger();
        break;
      default:
        if (!this.nearbyView) {
          this.nearbyView = new NearbyView({el: $('#nearby').get(0)});
          this.nearbyView.user=user.current();
        }
        this.nearbyView.trigger();
        break;
    }
  }
});

module.exports = IndexView;
