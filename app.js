var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "sql-database-youtube-api.cre99xo49ecy.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "password",
  port: 3306
});

console.log("getting to here");
connection.connect(function(err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

connection.end();
