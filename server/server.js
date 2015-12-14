var express = require('express');
var bodyParser = require('body-parser');

var app = express();

///////////////////////////////////////////////////// CONFIGURATION ROUTES

app.use(express.static(__dirname + '/../client/angular.min.js'));

app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/../client/index.html');
});


///////////////////////////////////////////////////// RUN SERVER

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(8000, function () {
  console.log('listening on PORT 8000');
});

module.exports = app;