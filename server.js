const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

var server;
var configs = {};
var mysqlConnection = mysql.createConnection({
	host: "localhost",
	user: "admin",
	password: "admin"
})

connection.connect(function(err) {
	if(err) throw err;
	console.log("Connected to MySQL");
})
connection.query("use Robotics", function(err) {
	if(err) throw err;
	console.log("Server is using the database Robotics");
})

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

function processInlineCFGs(html, path, reference, data){
  var tempHTML = html;
  var toProcess;
  if(!data) data = {
    lineRef:{}
  }};

  while(tempHTML.includes("<cfg>")){
    //Get raw text
    toProcess=JSON.parse(tempHTML.substring(tempHTML.indexOf("<cfg>")+5, tempHTML.indexOf("</cfg>")));

    //Test for type
    if(toProcess.type){
      if(toProcess.type=="content"){
        //See if content is for header or is fragment
        if(toProcess.src){
          //Template render
          html = html.substring(html.indexOf("</cfg>")+6);
          return processInlineCFGs(fs.readFileSync(`./webpages/${toProcess.src}.html`, "UTF-8"), "/"+toProcess.src, html);
        }else if(toProcess.src){
          //Fragment
          return html.substring(html.indexOf("</cfg>")+6);
        }else{

        }
      } else if(toProcess.type=="template"){
        if(reference){
          tempHTML=tempHTML.substring(0, tempHTML.indexOf("<cfg>"))+reference+tempHTML.substring(tempHTML.indexOf("</cfg>")+6);
          //Process CSS and JS fields TODO
          continue;
        }else{
          console.log('Configs with a type of "template" must have a valid "content" html to load into');
        }
      }else if(toProcess.type=="fragment"){
        let fragFile = fs.readFileSync(`./webpages/${toProcess.src}.html`, "UTF-8");
        fragFile = processInlineCFGs(fragFile, toProcess.src, toProcess.data);
        tempHTML = tempHTML.substring(0, tempHTML.indexOf("<cfg>"))+fragFile+tempHTML.substring(tempHTML.indexOf("</cfg>")+6);
      }else if(toProcess.type=="data"){
        //Do data

      }else if(toProcess.type == "link"){
        if(src){
          //Place in HTML
        }else if(type){
          //Set positons
        }else{
          //None applicable
        }
        let end = toProcess.src.substring(toProcess.indexOf("."));
        if(data.lineRef[end]){
          //Insert at line
          tempHTML.
        }else{
          //Insert where declared
        }
      }else{
        console.log(`Type "${type}" not recognized in ${path}`)
      }
    }

    tempHTML=tempHTML.substring(0, tempHTML.indexOf("<cfg>")) + tempHTML.substring(tempHTML.indexOf("</cfg>")+6);
  }

  //Do data and other processing after initial template and fragment processing

  return tempHTML;
}

function reloadServerCFGs(){

}

server = http.createServer(onRequest);
server.listen(3000);
console.log("Server is now running...");
