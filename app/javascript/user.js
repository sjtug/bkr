var register = function(username, password, email, success, error){
  var user = new AV.User();
  user.set("username", username);
  user.set("password", password);
  user.set("email", email);

  user.signUp(null, {
    success: success(),
    error: error()
  });
  return false;
}
var validateUser = function(username, success, error){
  var query = new AV.Query(AV.User);
  query.equalTo("username", username);
  query.find({
    success: function(results){
      if(results.length){
        error("User exists");
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
        error("email exists!");
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
    success : success(),
    error : error()
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