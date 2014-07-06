var MD5 = require("./lib/md5");

var register = function(username, password, email, success, error){
  if(username.length <= 3){
    error("用户名长度不能小于3");
    return;
  }
  var user = new AV.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  user.set("realname", "");
  user.set("telephone", "");
  user.set("qqnumber", "");
  user.set("wxnumber", "");

  user.signUp(null, {
    success: function(user){
      success();
    },
    error: function(user, err){
      error(err.message);
    }
  });
  return false;
}
var validateUser = function(username, success, error){
  if(username.length <= 3){
    error("用户名长度不能小于3");
    return;
  }
  var query = new AV.Query(AV.User);
  query.equalTo("username", username);
  query.find({
    success: function(results){
      if(results.length){
        error("用户已存在");
      }else{
        success();
      }
    },
    error : function(err){
      error(err.message);
    }
  })
}
var validateEmail = function(email, success, error){
  var query = new AV.Query(AV.User);
  query.equalTo("email", email);
  query.find({
    success : function(results){
      if(results.length){
        error("邮箱已存在");
      }else{
        success();
      }
    },
    error : function(err){
      error(error.message);
    }
  })
}

var login = function(username, password, success, error){
  AV.User.logIn(username, password, {
    success : function(){
      success();
    },
    error : function(user, err){
      console.log(err.code +" "+ err.message);
      error("用户名密码不正确");
    }
  });
}

var reset = function(email, success, error){
  AV.User.requestPasswordReset(email, {
    success : success(),
    error : error()
  });
}

var logout = function(){
  AV.User.logOut();
}

var current = function() {
  try {
    var user = AV.User.current();
    return user;
  } catch (e) {
    return null;
  }
}

var avatar = function(size, user){
  user = user || AV.User.current();
  if(user){
    return "http://www.gravatar.com/avatar/"+MD5(user.get("email"))+"?s="+(size || 120)+"&d=mm";
  }else{
    return "http://www.gravatar.com/avatar/404?s="+(size || 120)+"&d=mm";
  }
}

var changePassword = function(oldpassword, newpassword, repassword, success, error){
  if(oldpassword.length==0){
    error("当前密码不能为空！");
    return
  }
  if(newpassword.length==0){
    error("新密码不能为空！");
    return;
  }
  if(newpassword != repassword){
    error("两次密码不一样！");
    return ;
  }
  AV.User.logIn(current().get("username"), oldpassword, {
    success : function(){
      var user = current();
      user.set("password", newpassword);
      user.save(null, {
        success : function(user){
          success();
        },
        error : function(user, err){
          error(err.message);
        }
      });
    },
    error : function(){
      error("当前密码不正确！");
    }
  })
}

var getUser = function(username, successcal, errorcal){
  var query = new AV.Query(AV.User);
  query.equalTo("username", username);
  query.find({
    success : function(results){
      if(results.length == 0){
        errorcal("用户不存在")
      }else{
        successcal(results[0]);
      }
    },
    error : function(error){
      errorcal(error.message);
    }
  })
}
var saveBasic = function(realname, telephone, qqnumber, wxnumber, successcal, errorcal){

  current().set("realname", realname);
  current().set("telephone", telephone);
  current().set("qqnumber", qqnumber);
  current().set("wxnumber", wxnumber);

  var user = new AV.User(current());
  user.id = current().id;
  user.fetchWhenSave(true);

  user.save(null, {
    success : function(user){
      successcal();
    }, 
    error : function(user, error){
      errorcal(error.message);
    }
  });
}


exports.register = register;
exports.validateUser = validateUser;
exports.validateEmail = validateEmail;
exports.login = login;
exports.reset = reset;
exports.current = current;
exports.logout = logout;
exports.avatar = avatar;
exports.changePassword = changePassword;
exports.getUser = getUser;
exports.saveBasic = saveBasic;