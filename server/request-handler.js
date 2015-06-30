/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var results = [];

exports.requestHandler = function(request, response) {
  if (request.method === 'GET') {
    console.log("Serving request type " + request.method + " for url " + request.url);

    var statusCode = 200;

    var headers = defaultCorsHeaders;
    var data = {
      'results': results
    };

    headers['Content-Type'] = "text/json";

    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
  }

  if (request.method === 'POST') {
    var statusCode = 201;
    var headers = defaultCorsHeaders;

    headers['Content-Type'] = "text/json";

    response.writeHead(statusCode, headers);
    response.end("what")
  }

  if (request.method === 'OPTIONS') {
    console.log('options!!')
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

