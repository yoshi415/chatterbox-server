/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var results = [];
var http = require('http');

exports.requestHandler = function(request, response) {
  
  var headers = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10,
  };

  var classes = request.url.slice(0,9)
  // if (classes === '/classes/') {

    if (request.method === 'OPTIONS') {
      console.log('options!!')
      response.writeHead(200, headers);
      response.end();
    }
    if (request.method === 'GET') {
      console.log("Serving request type " + request.method + " for url " + request.url);
      headers['content-type'] = 'application/json';
      var statusCode = 200;
      var message = {
        'results': results
      };

      message = JSON.stringify(message);
      response.writeHead(statusCode, headers);
      response.end(message);
      console.log("GET MADE")
    }

    if (request.method === 'POST') {
      var statusCode = 201;
      var body = "";

      request.on('data', function(chunks) {
        body += chunks;
      });

      request.on('end', function() {
        body = JSON.parse(body)
        results.push(body);
        response.writeHead(statusCode, headers);
        response.end();
      });  
      console.log("POST MADE")
    }

   
  // } else {
  //   var statusCode = 404
  //   response.writeHead(statusCode, headers);
  //   response.end();
  // }
};


