// var backbone = require("backbone");

var init = function(){
	AV.initialize("1dskqanoffmn1z7ovp5u20gry3jdlw3iq3bpws06y6swn7hy", "jd8cafs94pn9lcglmoqmd0grm97fe80yywge09d9z3upmhha");
}

var register = function(username, password, email){
	var user = new AV.User();
	user.set("username", username);
	user.set("password", password);
	user.set("email", email);

	user.signUp(null, {
		success: function(user){
			alert("welcome");
		},
		error: function(user, error){
			alert("Error: " + error.code+" "+ error.message);
		}
	});
	return false;
}
var validateUser = function(username){
	var query = new AV.Query(AV.User);
	query.equalTo("username", username);
	query.find({
		success: function(results){
			if(results.length){
				console.log("user exists!");
			}else{
				console.log("user does not exists!");
			}
		},
		error : function(error){
			console.log("Error: "+error.code+" "+error.message);
		}
	})
}
var validateEmail = function(email){
	var query = new AV.Query(AV.User);
	query.equalTo("email", email);
	query.find({
		success : function(results){
			if(results.length){
				console.log("email exists!");
			}else{
				console.log("email does not exists!");
			}
		},
		error : function(error){
			console.log("Error: "+error.code+" "+error.message);
		}
	})
}

var login = function(username, password){
	AV.User.logIn(username, password, {
		success : function(user){
			console.log("welcome "+user.get("username"));
		},
		error : function(user, error){
			console.log("Error: "+error.code+" "+error.message);
		}
	});
}

var reset = function(email){
	AV.User.requestPasswordReset(email, {
		success : function(){
			console.log("reset success!");
		},
		error : function(){
			console.log("reset fail");
		}
	});
}

exports.init = init;
exports.register = register;
exports.validateUser = validateUser;
exports.validateEmail = validateEmail;
exports.login = login;
exports.reset = reset;