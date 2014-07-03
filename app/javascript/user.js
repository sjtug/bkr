var register = function(username, password, email, success, error){
  if(username.length <= 3){
    error("用户名长度不能小于3");
    return;
  }
  var user = new AV.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

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

exports.register = register;
exports.validateUser = validateUser;
exports.validateEmail = validateEmail;
exports.login = login;
exports.reset = reset;