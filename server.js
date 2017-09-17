const http = require('http');
const fs = require('fs');
const path = require('path');

var server;
var configs = {};

function onRequest(request, response){
  console.log();
  console.log("User made a request for " + request.url);
  if(request.url.startsWith("/_db/")){
    //DB is database calls
    console.log(`database access with raw of ${request.url}`);
  }else if(request.url.startsWith("/_asset/")){
    //Asset is Javascript or CSS

    console.log(`Loading asset with directory of ${request.url}`);

    var page;
    if(request.url.endsWith(".css")){
      page = "/stylesheet"
      response.setHeader('Content-Type', 'text/css');
      console.log("CSS");
    }else if(request.url.endsWith(".js")){
      page = "/javascript"
      console.log("JS");
      response.setHeader('Content-Type', 'application/javascript');
    }else{
      page = "";
    }

    var path = request.url.substring(7, request.url.length);

    try{
      page = fs.readFileSync(`./_assets${page}${path}`, "UTF-8");
      response.writeHead(200);
    }catch(err){
      console.log("Asset Error");
      page = "Asset does not exist";
      response.setHeader('Content-Type', 'text/plain');
      response.writeHead(404);
    }

  }else if(request.url.startsWith("/_data/")){
    /*Not related to document's function
    Includes images and fonts*/
    console.log(`Getting data from ${request.url}`);
  }else{
    //Is HTML page
    console.log("HTML");
    response.setHeader('Content-Type', 'text/html');

    var page;
    try{
      if(request.url.split()) page = fs.readFileSync(`./webpages${request.url}.html`, "UTF-8");
    }catch(err){
      //Test index
      try{
        page = fs.readFileSync(`./webpages${request.url}/index.html`, "UTF-8");
      }catch(indexErr){
        //404
        response.writeHead(404);
        page = fs.readFileSync("./_assets/404.html");
      }
    }

  }
  response.write(page);
  response.end();
}

function loadHTML(url, res){
  var page;

  respose.setHeader('Content-Type', 'text/html');

  //If has with illegal characters
  if(url.contains(/^?_/)) {
    response.writeHead(404);
    return fs.readFileSync("./_assets/404.html", "UTF-8");
  }else{
    //Check for non index Files
    try{
      return fs.readFileSync(`./wepages${request.url}/index.html`, "UTF-8");
    }catch(nie){
      //Check for index files
      try{
        return fs.readFileSync(`./webpages${request.url}.html`);
      }catch(err){
        //Return 404;
        response.writeHead(404);
        return fs.readFileSync("./_asets/404.html")
      }
    }
  }
}

function reloadCFGs(){

}

server = http.createServer(onRequest);
server.listen(3000);
console.log("Server is now running...");
