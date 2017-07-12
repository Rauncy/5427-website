const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const ejs = require('ejs');


var server;
var configs = {};
const DB_MASTER= mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "admin"
});

function setupDatabase(database){
	DB_MASTER.connect(function(err) {
		if(err) throw err;//console.log("Error connecting to database");
		else{
			console.log("Connected to MySQL");
			DB_MASTER.query("use " + database, function(err) {
				if(err) console.log("Error connecting to the database " + robotics);
				else console.log("Server is using the database " + database);
			});
		}
	});
}

function onRequest(request, response){
  console.log();
  console.log("User made a request for " + request.url);
  if(request.url.startsWith("/_db/")){
    //DB is database calls
    //Replace delimited characters with proper characters
    var reqdata = request.url.split("%7B").join("{");
    reqdata = reqdata.split("%7D").join("}");
    reqdata = reqdata.split("%20").join(" ");
    reqdata = JSON.parse(request.url.substring(5));
    if(reqdata.data) DB_MASTER.query(reqdata.data);
    console.log(`Database access with raw of ${request.url} and a request of ${reqdata}`);
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
    console.log("HTML: " + request.url);
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
      console.log(`/webpages${url}index.html : ${url}`);
      path = fs.readFileSync(`webpages${url}index.html`, "UTF-8");
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
        path = fs.readFileSync("./_assets/404.html", "UTF-8");
        console.log(`DNE404 : ${url}`);
      }
    }
  }

	console.log(`${path} ${url} `);

  path = processInlineCFGs(path, url);

  return path;
}

function processInlineCFGs(html, content){
	if(content === null) content = {};

	if(content.topPage){
		console.log("Template to render sequence not implemented");
	}

	console.log(html);

	html = ejs.render(html);
	return html;
}

function reloadServerCFGs(){

}

server = http.createServer(onRequest);
server.listen(3000);
setupDatabase("robotics");
console.log("Server is now running...");
