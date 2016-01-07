/**
 * Date conversion methods.
 *
 * @param  {String} unix timestamp or a natural language date
 * @return {String} json object ex. { "unix": 1450137600, "natural": "December 15, 2015" }
 */

 var API_KEY = 'AIzaSyAe3GpWmJcv-fz6qLhq6lTLRZu37dDxnwY'; // specify your API key here
 var numResults = 10;

 //GET 

 

module.exports = {

  /**
  * Return json object with both dates.
  *
  * @param  {String} aDate containing one of the specific date
  * @return {String} json object ex. { "unix": 1450137600, "natural": "December 15, 2015" }
  */
  searchImage: function(querySearch, offset, callback) {

    var https = require('https');
     var result = "";
     var url_search = "https://www.googleapis.com/";

     var options = {
        host: 'www.googleapis.com',
        path: "/customsearch/v1?q=" + querySearch + "&num=" + numResults + "&start=" + (numResults * offset) + "&searchType=image&key=" + API_KEY,
        //since we are listening on a custom port, we need to specify it by hand
        port: '80',
        //This is what changes the request to a POST request
        method: 'GET'
    };

     var req = https.request(url_search, function (data) {
            callback(data);
      });

     req.on('error', function(err) {
           console.log(err);
     });

     req.end();
  }

  
};