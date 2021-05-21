
var path = require('path')
var express = require('express')

var app = express();

app.use(express.static(path.join(__dirname, '/dist/gameOfLife/')));

app.get('/*', function(req, res){
  res.sendFile("index.html", {root: path.join(__dirname, '/dist/gameOfLife')});
});

let port = process.env.PORT || 8080;
app.listen(port);
