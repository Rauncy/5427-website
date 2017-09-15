var http = require('http');
var fs = require('fs');
var server;

function onRequest(request, response){
  console.log("User made a request for " + request.url);
  if(request.url.startsWith("/_db/")){
    console.log(`database access with raw of ${request.url}`);
  }else if(request.url.startsWith("/_asset/")){
    console.log(`Loading asset from webpages directory with filename of ${request.url}`);
  }else if(request.url.startsWith("/_data/")){
    console.log(`Getting data from ${request.url}`)
  }else{
    //Is HTML page
    response.writeHead(200, {"Context-Type" : "text/html"});

    response.write(fs.readFile(`./webpages${webpages}`));
    if(err){
      //File doesn't exist
      response.write(fs.readFile("./webpages/404.html"));
    }
  }
  response.end();

  //Supply correct data and pages
}

server = http.createServer(onRequest);
server.listen(3000);
console.log("Server is now running...")
