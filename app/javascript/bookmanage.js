
$ = require("jquery");
var Book =  AV.Object.extend("book");
var User = AV.User.current();
var GeoCoding = require("./geocoding");

var fetchBookInfo=function(isbn,callback,error_callback) {
  var error_callback=error_callback||function(data){console.log(data)};
  $.ajax({
             timeout:3000,
             url:"http://api.douban.com/v2/book/isbn/"+isbn,
             dataType:"jsonp",
             jsonp:"callback",
             success: callback,
             error: error_callback
        });
};

/*
var fakeBookWithLocation = function(isbn,locationArray)
{
  var error_callback=function(data){console.log(data)};
  var success_callback=function(data){console.log(data)};
  var queryUserBookCallback = function(result)
  {
    if(result){
       error_callback("BOOK_ALREADY_EXISTS");
       return;
    }
    var bookInfoCallback = function(infodata){
      if(infodata && infodata.title){     
          var newbook = new Book();
          newbook.set("detail",infodata);
          newbook.set("title",infodata.title);
          newbook.set("author",infodata.author);
          newbook.set("isbn",isbn);
          newbook.set("owner",User);
          newbook.set("location",new AV.GeoPoint({latitude:locationArray[0], longitude: locationArray[1]}));
          newbook.save(null, { 
            success: success_callback,
            error: function(newbook, error) {
              error_callback(error.description);   
            }
          });       
      } else{
        error_callback("BOOK_INFO_NOT_FOUND");
        return;
      }
    }
    fetchBookInfo(isbn,bookInfoCallback)
  }
  queryUserBook(isbn,queryUserBookCallback);
}*/

var addBook = function(isbn,infodata,success_callback,error_callback) {
  error_callback=error_callback||function(data){console.log(data)};
  var queryUserBookCallback = function(result){
    if(result){
       error_callback("BOOK_ALREADY_EXISTS");
       return;
    }   
      var newbook = new Book();
      newbook.set("detail",infodata);
      newbook.set("title",infodata.title);
      newbook.set("author",infodata.author);
      newbook.set("isbn",isbn);
      newbook.set("owner",User);
      newbook.save(null, { 
        success: success_callback,
        error: function(newbook, error) {
          error_callback(error.description);   
        }
      });
      var locationCallback = function(location){
        var streetnameCallback = function(streetname){
           newbook.set("location",new AV.GeoPoint({latitude: location.coords.latitude, longitude: location.coords.longitude}));
           if(streetname.result && streetname.result.addressComponent)
           {
            newbook.set("streetname",streetname.result.addressComponent);
           }
           newbook.save();
        }
        GeoCoding.geoDecodingGPS(location.coords.latitude,location.coords.longitude,streetnameCallback);
      }
    navigator.geolocation.getCurrentPosition(locationCallback);     
  }
  queryUserBook(isbn,queryUserBookCallback);
}

var queryUserBook = function(isbn,callback){  
  var query = new AV.Query(Book);
  query.equalTo("owner", User);
  query.equalTo("isbn", isbn);
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
  error_callback=error_callback || function(data){console.log(data)};
      bookobj.destroy({
        success:success_callback,
        error:error_callback
    });
}
var removeBookByISBN = function(isbn){
  queryUserBook(isbn,function(bookobj){
    if(bookobj){
      removeBook(bookobj,function(data){
        console.log(data)
      });
    }

  });
}
  
var listNearBook = function(GeoPoint,callback){  
  var filterCallback = function (results){
    var symbol = {};
    var res = [];
    for (var idx in results){
      var isbn = results[idx].get("isbn")
      if(isbn && !symbol[isbn]){          
          symbol[isbn] = true;
          res.push(results[idx]);          
      }
    } 
  callback(res);
  }  
  var query = new AV.Query(Book);
  query.descending("createdAt");
  query.withinKilometers("location", GeoPoint,5);
  query.include("owner");
  query.notEqualTo("owner", User);
  query.limit(100);
  query.find({
  success: filterCallback
  });
}


var listBookByUser = function(userObj,callback){
  var query = new AV.Query(Book); 
  query.equalTo("owner", userObj);
  query.descending("createdAt");
  query.find({
      success: function(results){
        callback(results);
      },
      error: function(err){
        console.log(err);
      }
    });
}

var listUserByBook = function(bookObj,callback)
{
  function queryCallback(results)
  {   
    var ownerList = [];
    for (var idx in results){
      ownerList.push(results[idx].get("owner"));
    }
    callback(ownerList);
  }

   var query = new AV.Query(Book);
   query.descending("createdAt");
   query.include("owner");
   query.select("owner");
   query.equalTo("isbn",bookObj.get("isbn"));
   query.find({
    success: queryCallback
    });
}


var addStreetNameToAllBooks = function()
{
  function queryCallback(results)
  {   
    for (var idx in results){    
      function temp(){ 
        var newbook=results[idx]; 
        var streetnameCallback = function(streetname){
           if(streetname.result && streetname.result.addressComponent)
           {
            newbook.set("streetname",streetname.result.addressComponent);
           }
           newbook.save({success:function(n){console.log(n.get("title")+" succ");}});
        }
        GeoCoding.geoDecodingGeoPoint(newbook.get("location"),streetnameCallback);
        }
        temp();
    }
  }

   var query = new AV.Query(Book);
   query.doesNotExist("streetname");
   query.find({
    success: queryCallback
    });
}

var fakeBook = function(isbn){ 
   Nihiue_test.fetchBookInfo(isbn,function(data){
    Nihiue_test.addBook(isbn,data,function(Obj){
      console.log(Obj.get("title"));
    });
  });
}
// For TEST BEGIN
exports.fakeBook  = fakeBook ;
exports.addStreetNameToAllBooks = addStreetNameToAllBooks;
exports.queryUserBook = queryUserBook;
// For TEST END
exports.removeBookByISBN = removeBookByISBN;
exports.fetchBookInfo = fetchBookInfo; 
exports.addBook  = addBook ;
exports.removeBook  = removeBook ;
exports.listNearBook  = listNearBook ;
exports.listBookByUser   = listBookByUser  ;
exports.listUserByBook   = listUserByBook  ;