// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "sql-database-youtube-api.cre99xo49ecy.us-east-2.rds.amazonaws.com",
//   user: "admin",
//   password: "password",
//   port: 3306
// });

// console.log("getting to here");
// connection.connect(function(err) {
//   if (err) {
//     console.error("Database connection failed: " + err.stack);
//     return;
//   }

//   console.log("Connected to database.");
// });

// connection.end();

import express from "express";

// Set up the express app
const app = express();

// get all todos
app.get("/api/v1/todos", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "todos retrieved successfully",
    todos: db
  });
});
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
