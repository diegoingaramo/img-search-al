var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5001));

app.get("/new/*", function(req, res) 
{
    res.end("hola");
});

app.get("/*", function(req, res) {
    res.end("hola");
});

app.get(/.*/, function(req, res) {
    res.end("hola");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});