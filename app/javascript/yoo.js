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
var getyoos = function(begin, successcal, errorcal){
	var user = User.current();
	var query = new AV.Query(AV.User);
	query.equalTo("toUser", user);
	query.limit(50);
	query.skip(begin);
	query.find({
		success : function(results){
			successcal(results);
		}, 
		error : function(error){
			errorcal(error);
		}
	});
}

exports.yoo = yoo;