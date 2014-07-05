var User = require("./user");

var yoo = function(toUser, successcal, errorcal){
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

	var saveYoo = function(){
		followOther.save(null, {
			success : function(follow){
				successcal(follow.get("binary"));
			}, 
			error : function(follow, error){
				errorcal(error.message);
			}
		});		
	}

	var query = new AV.Query("Yoo");
	query.equalTo("fromUser", toUser);
	query.equalTo("toUser", user);
	query.find({
		success : function(results){
			if(results.length == 0){
				followOther.set("binary", false);
			}else{
				followOther.set("binary", true);
				for(var i=0; i<results.length;i++){
					result = results[i];
					result.set("binary", true);
					result.save();
				}
			}
			saveYoo();
		}
	});

}
var getyoos = function(begin, successcal, errorcal){
	var user = User.current();
	var query = new AV.Query("Yoo");
	query.include("fromUser");
	query.include("toUser");
	query.equalTo("toUser", user);
	query.descending("createdAt");
	query.limit(50);
	query.skip(begin);
	query.find({
		success : function(results){
			console.log(results);
			successcal(results);
		}, 
		error : function(error){
			errorcal(error);
		}
	});
}

//戳多少次
var yooed = function(otheruser, successcal, errorcal){
	var fromquery = new AV.Query("Yoo");
	fromquery.include("fromUser");
	fromquery.include("toUser");
	fromquery.equalTo("fromUser", User.current());
	fromquery.equalTo("toUser", otheruser);

	var toquery = new AV.Query("Yoo");
	toquery.include("fromUser");
	toquery.include("toUser");
	toquery.equalTo("fromUser", otheruser);
	toquery.equalTo("toUser", User.current());

	var mainquery = AV.Query.or(fromquery, toquery);
	mainquery.include("fromUser");
	mainquery.include("toUser");

	var getTimes = function(results){
		var times = {};
		times.yooed = 0;
		times.yooes = 0;
		for(var i in results){
			var result = results[i];
            console.log(result);
            console.log(result.get("fromUser").get('username'));
			if(result.get("fromUser").get('username') == User.current().get('username')){
				times.yooes++;
			}else{
				times.yooed++;
			}
		}
		return times;
	}

	mainquery.find({
		success : function(results){
			successcal(getTimes(results));
		},
		error : function(error){
			errorcal(error.message);
		}
	});

}

exports.yoo = yoo;
exports.getyoos = getyoos;
exports.yooed = yooed;
