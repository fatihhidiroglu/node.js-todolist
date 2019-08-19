var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var connection = require('./connection');
var routes = require('./routes');

var app = express().use('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});

connection.init();
routes.configure(app);

app.listen(8080, function () {
  console.log('Server çalışıyor.');
});