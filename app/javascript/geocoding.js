$ = require("jquery");
var geoDecodingGPS=function(lat,lng,callback)  {
   $.ajax({
             url:"http://api.map.baidu.com/geocoder/v2/?ak=GIh75iE8qoYHRID6sNayZCBA&output=json&location="+lat+","+lng,
             dataType:"jsonp",
             jsonp:"callback",
             success: callback
        });
};
var geoDecodingGeoPoint=function(GeoObj,callback){
  if(GeoObj.latitude){
     geoDecodingGPS(GeoObj.latitude,GeoObj.longitude,callback);
  } 
}

exports.geoDecodingGPS   =  geoDecodingGPS;
exports.geoDecodingGeoPoint   = geoDecodingGeoPoint;