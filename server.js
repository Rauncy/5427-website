var http = require('http');
var fs = require('fs');
var server;

function onRequest(request, response){
  console.log("User made a request for " + request.url);
  if(request.url.endsWith(".css")){

  }else if(request.url.endsWith(".js"){

  }else if(request.url.startsWith("/_db/")){

  }else if(request.url.startsWith("/_asset/")){

  }else if(request.url.startsWith("/_data/")){

  }else{

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
