var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var IndexView = require("./views/indexView");
var LoginView = require("./views/loginView");
var RegisterView = require("./views/registerView");
var BookView = require("./views/bookView");
var PeopleView = require("./views/peopleView");
var BarcodeView = require("./views/barcodeView");
var AboutView = require("./views/aboutView");
var SettingsView = require("./views/settingsView");


var App = require("./app");
var user = require("./user");

var app = App.app;
var mainView = App.mainView;
var baseNavTemplate = _.template($('#tmpl-base-nav').html());

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login': 'login',
    'register': 'register',
    'logout': 'logout',
    'scanbarcode': 'scanbarcode',
    'settings': 'settings',
    'about': 'about',
    'book/:isbn': 'book',
    'people/:username': 'people',
  },
  index: function(tab){
    app.closeModal('.popup');
    this.pushPage({});
    if (!this.indexView) {
      this.indexView = new IndexView();
    }
    this.indexView.render();
  },
  login: function(){
    app.closeModal();
    if(!this.loginView){
      this.loginView = new LoginView();
    }
    this.loginView.popup();
  },
  register: function(){
    app.closeModal();
    if(!this.registerView){
      this.registerView = new RegisterView();
    }
    this.registerView.popup();
  },
  settings: function(){
    this.pushPage('', '设置', {}, SettingsView);
  },
  logout: function(){
    user.logout();
    this.navigate('', true);
  },
  book: function(isbn){
    this.pushPage('', 'book', {isbn:isbn}, BookView);
  },
  people: function(username){
    console.log("people");
    this.pushPage('', username, {username:username}, PeopleView);
  },
  scanbarcode: function() {
    var barcodeView = new BarcodeView();
    barcodeView.render();
  },
  about: function() {
   this.pushPage('', '关于', {}, AboutView);
  },
  execute: function(callback, args) {
    if (callback) {
      if (callback!=this.login && callback!=this.register) {
        if (!user.current()){
          this.navigate('#login', true);
          return;
        }
      }
      callback.apply(this, args);
    }
  },
  pushPage: function(back, title, data, ViewClass) {
    if (!this._history) this._history = [''];
    if (this._history.length>1) {
      var last2 = this._history[this._history.length-2];
      console.log(last2);
      if (last2 == Backbone.history.fragment) {
        this._history.pop();
        mainView.goBack();
        return;
      }
    }
    else if (Backbone.history.fragment==''){
      mainView.goBack();
      return;
    }
    back = back || '';
    if (this._history.length > 0){
      back = '#' + this._history[this._history.length-1];
    }
    mainView.loadContent(baseNavTemplate({back:back, title:title}));
    var newView = new ViewClass({el: $('.page-on-center .page-content').get(0)});
    newView.render(data);
    this._history.push(Backbone.history.fragment);
  }
});

var router = new Router();
module.exports = router;
