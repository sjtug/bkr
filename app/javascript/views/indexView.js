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
  $refresh: $('#refresh'),
  leftPanelTemplate: _.template($('#tmpl-left-side-menu').html()),
  initialize: function(){
    var ts = this;
    this.$leftPanel.on('opened', this.leftPanelOpened);
    this.$leftPanel.on('closed', this.leftPanelClosed);
    this.$refresh.on('click', function(){ts.refresh.call(ts)});
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
  triggerTab: function(name, force) {
    var view = null;
    switch (name) {
      case '#books':
        if (!this.bookListView) {
          this.bookListView = new BookListView({el: $('#books').get(0)});
          this.bookListView.user=user.current();
        }
        view = this.bookListView;
        break;
      case '#yoo':
        if (!this.yooView) {
          this.yooView = new YooView({el: $('#yoo').get(0)});
          this.yooView.user=user.current();
        }
        view = this.yooView;
        break;
      default:
        if (!this.nearbyView) {
          this.nearbyView = new NearbyView({el: $('#nearby').get(0)});
          this.nearbyView.user=user.current();
        }
        view = this.nearbyView;
        break;
    }
    if (force) view.render();
    else view.trigger();
  },
  refresh: function() {
    console.log('refresh');
    var activeTab = this.$('tab active');
    this.triggerTab(activeTab.attr('id'), true);
  }, 
});

module.exports = IndexView;
