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
    "access-control-max-age": 10 // Seconds.
  };

  // if (request.url === '/classes/room1' || request.url === '/classes/messages') {
    if (request.method === 'GET') {
      // console.log("Serving request type " + request.method + " for url " + request.url);

      var statusCode = 200;

      var message = {
        'results': results
      };

      // var message = JSON.parse(response._data).results;
      // var msg = message[0];
      // console.log("msg", msg);
      // console.log("Response", message[0])
      headers['Content-Type'] = "text/json";

      response.on('data', function(chunks) {
        console.log(chunks)
      });

      response.on('end', function(chunk) {
        console.log("test", chunk);
      });  
      
      
      response.writeHead(statusCode, headers);
      // response.end(response._data);
      response.end(message);
      // cb = function(response) {
      //   response.on('data', function(chunk) {
      //     str+= chunk;
      //   });
      //   response.on('end', function() {
      //     console.log(req.data);
      //     console.log(str);
      //   })
      // }
      // var req = http.request(options,cb).end();
    }

    if (request.method === 'POST') {
      var statusCode = 201;
      console.log(request)
      results.push(request)

      // console.log(request._postData)
      // results.push(request._postData)

      headers['Content-Type'] = "text/json";

      response.writeHead(statusCode, headers);
      response.end("Data received")
    }

    if (request.method === 'OPTIONS') {
      console.log('options!!')
    }
  // } else {
  //   var statusCode = 404
  //   response.writeHead(statusCode, headers);
  //   response.end();
  // }
};


