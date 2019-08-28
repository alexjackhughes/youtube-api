import mysql from "mysql";

// NOTE: In a production app these would be secret 'env' variables
// but for ease of sharing the code I've left them static.
const connection = mysql.createConnection({
  host: "sql-database-youtube-api.cre99xo49ecy.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "password",
  port: 3306
});

connection.connect(function(err) {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }

  console.log("Connected to database.");
});

export default connection;
