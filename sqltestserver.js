var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin"
});



con.connect(function(err) {
    con.query("drop database robotics", function(err, result) {
        if(err) throw err;
    })
    if(err) throw err;
  console.log("Connected!");
  con.query("create database robotics", function (err, result) {
    if(err) throw err;
    con.query("use robotics", function(err) {
        if(err) throw err;
    });
    console.log("Database created!");
    con.query("create table members (FirstName tinytext, LastName tinytext, Grade tinyint(50)", function(err, result) {
        if(err) throw err;
        console.log("Table created!");
        con.query("insert into members (FirstName, LastName, Grade) values ('Blake' ,'Romero', '11')", function(err) {
            if(err) throw err;
            console.log("Blake added!");
            con.query("select FirstName, LastName, Grade from members", function(err, result,fields) {
                if(err) throw err;
                console.log(result);
            })
        })
    })
  });
});
