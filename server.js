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
    page = loadHTML(request.url, response);
  }
  response.write(page);
  response.end();
}

function loadHTML(url, res){
  var page;

  res.setHeader('Content-Type', 'text/html');

  var path;

  //If has with illegal characters
  if(url.includes("^") || url.includes("_")) {
    res.writeHead(404);
    path = fs.readFileSync("./_assets/404.html", "UTF-8");
    console.log(`Data404 : ${url}`);
  }else{
    //Check for non index Files
    try{
      console.log(`/webpages${url}/index.html : ${url}`);
      path = fs.readFileSync(`./webpages${url}/index.html`, "UTF-8");
      res.writeHead(200);
    }catch(nie){
      //Check for index files
      try{
        console.log(`/webpages${url}.html : ${url}`);
        path = fs.readFileSync(`./webpages${url}.html`, "UTF-8");
        res.writeHead(200);
      }catch(err){
        //Return 404;
        res.writeHead(404);
        path = fs.readFileSync("./_assets/404.html");
        console.log(`DNE404 : ${url}`);
      }
    }
  }

  path = processInlineCFGs(path, url, null);

  return path;
}

function processInlineCFGs(html, path, reference){
  var tempHTML = html;
  var toProcess;

  while(tempHTML.includes("<cfg>")){
    //Get raw text
    toProcess=JSON.parse(tempHTML.substring(tempHTML.indexOf("<cfg>")+5, tempHTML.indexOf("</cfg>")));

    //Test for header
    if(toProcess.type){
      if(toProcess.type=="content"){
        //Check for template and place in
        if(toProcess.src){
          html = html.substring(html.indexOf("</cfg>")+6);
          return processInlineCFGs(fs.readFileSync(`./webpages/${toProcess.src}.html`, "UTF-8"), "/"+toProcess.src, html);
        } else{
          console.log(`Configs with a type of "content" must have a valid "useTemplate" tag set to the template html`);
        }
      } else if(toProcess.type=="template"){
        if(reference){
          tempHTML=tempHTML.substring(0, tempHTML.indexOf("<cfg>"))+reference+tempHTML.substring(tempHTML.indexOf("</cfg>")+6);
          continue;
        }else{
          console.log('Configs with a type of "template" must have a valid "content" html to load into');
        }
      }else if(toProcess.type=="fragment"){
        console.log("Attempted to use an unfinished feature, FRAGMENT");
        let fragFile = fs.readFileSync(`./webpages/${toProcess.src}.html`, "UTF-8");
        fragFile = fragFile.substring(fragFile.indexOf("</cfg>")+6);

        tempHTML = tempHTML.substring(0, tempHTML.indexOf("<cfg>"))+fragFile+tempHTML.substring(tempHTML.indexOf("</cfg>")+6);
      }else{
        console.log(`Type "${type}" not recognized in ${path}`)
      }
    }

    tempHTML=tempHTML.substring(0, tempHTML.indexOf("<cfg>")) + tempHTML.substring(tempHTML.indexOf("</cfg>")+6);
  }

  return tempHTML;
}

function reloadServerCFGs(){

}

server = http.createServer(onRequest);
server.listen(3000);
console.log("Server is now running...");
