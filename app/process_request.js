#!/usr/bin/env node

var http = require('http');
var url = require('url');

http.createServer(
  function (request, response) 
  {
    let body = "";
    if (request.method === "POST")
    {
      request.on('data', (data) => 
      {
        body += data;
      });
        
      request.on('end', () => 
      {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(body, () => 
        {
          response.end();
          });
      });   
    }
  }
).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');


