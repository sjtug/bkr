$ = require("jquery")
var fetchBookInfo=function(isbn,callback)  
{
	 $.ajax({
             url:"http://api.douban.com/v2/book/isbn/"+isbn,
             dataType:"jsonp",
             jsonp:"callback",
             success: callback||function(data){console.log(data)}
        });
};
exports.fetchBookInfo = fetchBookInfo;