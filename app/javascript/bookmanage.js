var bookinfo = require("./bookinfo.js");
var Book =  AV.Object.extend("book");
var User = AV.User.current();
var addBook = function(isbn,success_callback,error_callback) {
  error_callback=error_callback||function(data){console.log(data)};
  var queryUserBookCallback = function(result)
  {
    if(result){
       error_callback("BOOK_ALREADY_EXISTS");
       return;
    }
    var bookInfoCallback = function(infodata){
      if(infodata && infodata.title){
        var locationCallback = function(location){
          var newbook = new Book();
          newbook.set("detail",infodata);
          newbook.set("title",infodata.title);
          newbook.set("author",infodata.author);
          newbook.set("isbn",isbn);
          newbook.set("owner",User);
          newbook.set("location",[location.coords.latitude,location.coords.longitude]);
          newbook.save(null, {
            success: success_callback,
            error: function(newbook, error) {
              error_callback(error.description);   
            }
          });
        }
        navigator.geolocation.getCurrentPosition(locationCallback);
      } else{
        error_callback("BOOK_INFO_NOT_FOUND");
        return;
      }
    }
    bookinfo.fetchBookInfo(isbn,bookInfoCallback)
  }
  queryUserBook(isbn,queryUserBookCallback);
}

var queryUserBook = function(isbn,callback){  
  var query = new AV.Query(Book);
  query.equalTo("owner", User);
  query.equalTo("isbn",isbn);
  query.find({
      success: function(results){
        if(results.length){
          callback(results[0]);
        }else{
          callback(false);
        }
      },
      error : function(err){
        callback(false);
      }
    })
}

var removeBook = function(bookobj,success_callback,error_callback){
  error_callback=error_callback||function(data){console.log(data)};
      bookobj.destroy({
        success:success_callback,
        error:error_callback
    });
}
  

var listUserBook = function(callback){
  var query = new AV.Query(Book);
  query.equalTo("owner", User);
  query.find({
      success: function(results){
        callback(results);
      },
      error : function(err){
        console.log(err);
      }
    });
}
var listNearByBook = function(callback){

}

exports.listNearByBook  = listNearByBook ;
exports.removeBook  = removeBook ;
exports.listUserBook   = listUserBook  ;
exports.addBook  = addBook ;
exports.queryUserBook  = queryUserBook ;

