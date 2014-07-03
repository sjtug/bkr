var ISBN_BOOK_INFO_HANDLER;
var fetchBookInfo=function(isbn,dataHandler)  
{
		ISBN_BOOK_INFO_HANDLER=dataHandler||function(data){console.log(data)};
        var url ="http://api.douban.com/v2/book/isbn/"+isbn+"?callback=ISBN_BOOK_INFO_HANDLER";
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script); 
};