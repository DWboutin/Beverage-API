require('babel/register')({
  stage: 0
});
var config = require('./config');

var express = require('express');
var api = require('./src/server.js');

api.listen(config.APP_PORT, function() {
  console.log('Server listening to port ' + config.APP_PORT);
});