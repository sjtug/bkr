var User = require("./user");

var yoo = function(toUser){
	var user = User.current();
	if(toUser == null){
		console.log("null");
		return;
	}
	if(user == toUser)return;
	var YooModel = AV.Object.extend("Yoo");
	var followOther = new YooModel();
	followOther.set("fromUser", user);
	followOther.set("toUser", toUser);
	followOther.save(null, {
		success : function(){
			console.log("follow success");
		}, 
		error : function(follow, error){
			console.log("follow error"+ error.code+" "+error.message);
		}
	})
}

exports.yoo = yoo;