var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	user: "admin",
	password: "admin"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL.");
})

connection.query("use Robotics", function(err) {
	if(err) throw err;
	console.log("Server is using the database Robotics.");
});

connection.query("insert into members values ('Chris', 'Zeller', 11)", function(err) {
	if(err) throw err;
	console.log("Chris was added to Members.");
})
