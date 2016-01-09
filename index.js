var express = require('express');
var app = express();
var image_utils = require('./image_utils.js');
var db_utils = require('./database_utils.js');

app.set('port', (process.env.PORT || 5001));

/* 
Search latest images search
*/
app.get("/api/latest/imagesearch", function(req, res) 
{
    res.writeHead(200, { 'Content-Type': 'application/json' });
    db_utils.latest_queries(function(items){
        console.log(items);
        res.end(JSON.stringify(items));
    });

});

app.get("/api/imagesearch/:searchQuery/:offset", function(req, res) {

    var searchQuery = req.params.searchQuery;
    var offset = req.params.offset;

    image_utils.searchImage(searchQuery,offset,function (data){

        res.writeHead(200, { 'Content-Type': 'application/json' });
        if (data == -1)
        {
        	res.end(JSON.stringify({error:"There was a problem processing your request. Please try again later."}));
        }
        db_utils.insert_query({term: searchQuery,when: new Date().toString()},function(){
            res.end(JSON.stringify(data));    
        });
    

    });

});

app.get("/", function(req, res) {
    res.redirect(307,'/api/latest/imagesearch');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});