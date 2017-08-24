var http = require('http');

function onRequest(request, response){
  console.log("User made a request for " + request.url);
  response.writeHead(200, {"Context-Type": "text/plain"});
  response.write("Data has been sent");
  response.end();
}

http.createServer(onRequest).listen(3000);
console.log("Server is now running...")
