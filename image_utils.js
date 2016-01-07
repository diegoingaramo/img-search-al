 const API_KEY = 'AIzaSyAe3GpWmJcv-fz6qLhq6lTLRZu37dDxnwY'; // specify your API key here
 const CX = "015117636991349592227:fldsnejgga0";



 var numResults = 10;

var https = require('https');
var google = require('googleapis');
var customsearch = google.customsearch('v1');

module.exports = {

  /**
  * Return json object with both dates.
  *
  * @param  {String} aDate containing one of the specific date
  * @return {String} json object ex. { "unix": 1450137600, "natural": "December 15, 2015" }
  */
  searchImage: function(querySearch, offset, callback) {

    //num: numResults, start: (numResults * offset)
    var options = {cx:CX, q: querySearch, auth: API_KEY, searchType:"image",num: numResults, start: (numResults * offset)};

    //console.log(JSON.stringify(options));

    customsearch.cse.list(options, function(err, resp) {

      if (err) {
        console.log('An error occured', err);
        callback(-1);
        return;
      }

      // Got the response from custom search
      console.log('Result: ' + resp.searchInformation.formattedTotalResults);
      if (resp.items && resp.items.length > 0) {
        //console.log('First result name is ' + resp.items[0].title);
      }

      callback(resp.items);

    });
  }

  
};