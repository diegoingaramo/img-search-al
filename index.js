var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5001));

/* 
Search latest images search
*/
app.get("/api/latest/imagesearch", function(req, res) 
{
    res.end("api/latest/imagesearch/");
});

app.get("/api/imagesearch/:searchQuery/:offset", function(req, res) {

    var searchQuery = req.params.searchQuery;
    var offset = req.params.offset;

    res.end("api/imagesearch/:searchQuery/:offset: " + searchQuery + " " + offset);

});

app.get("/", function(req, res) {
    res.redirect(307,'/api/latest/imagesearch');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});