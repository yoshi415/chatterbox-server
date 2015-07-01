/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var messages = [];
var http = require('http');
var express = require('express');
var url = require('url');

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
}

var dataCollector = function(request, callback) {
  var body = "";
  request.on('data', function(chunks) {
    body += chunks;
  });
  request.on('end', function() {
    callback(JSON.parse(body));
  })
}

var methods = {
  GET: function(request, response, statusCode) {
    sendResponse(response, {results: messages});
  },

  POST: function(request, response, statusCode) {
    dataCollector(request, function(data) {
      messages.push(data);
    });
    sendResponse(response, messages, 201);
  },

  OPTIONS: function(request, response, statusCode) {
    sendResponse(response, null);
  }
}

exports.requestHandler = function(request, response) {
  headers['content-type'] = 'application/json';
  var action = methods[request.method];
  if (action) {
    action(request, response);
  } else {
    sendResponse(response, "Not Found", 404)
  }
};

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
};

