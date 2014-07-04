var Backbone = require("backbone");

var IndexView = require("./views/indexView");
var LoginView = require("./views/loginView");
var BookView = require("./views/bookView");


var App = require("./app");
var user = require("./user");

var app = App.app;
var mainView = App.mainView;

var Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'login': 'login',
    'logout': 'logout',
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
    if (!this.loginView) {
      this.loginView = new LoginView();
    }
    this.loginView.popup();
  },
  logout: function(){
    user.logout();
    this.navigate('', true);
  },
  book: function(isbn){
    this.pushPage({isbn:isbn}, BookView);
  },
  people: function(username){

  },
  execute: function(callback, args) {
    if (callback) {
      if (callback!=this.login) {
        if (!user.current()){
          this.navigate('#login', true);
          return;
        }
      }
      callback.apply(this, args);
    }
  },
  pushPage: function(data, ViewClass) {
    console.log(data);
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
    data['back'] = '';
    if (this._history.length > 0){
      data['back'] = '#' + this._history[this._history.length-1];
    }
    var newView = new ViewClass();
    newView.render(data);
    mainView.loadContent(newView.el);
    this._history.push(Backbone.history.fragment);
  }
});

var router = new Router();
module.exports = router;
