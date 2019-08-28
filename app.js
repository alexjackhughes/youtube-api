require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";

import connection from "./setupDatabase";
import routes from "./routes";

const PORT = process.env.PORT;
const app = express();

// Connect the routes to the Express server
app.use("/", routes);

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Set the app to listen on localhost:5000
const server = app.listen(PORT, () => {
  console.log(`Howdy! The server is running on port: ${PORT}`);
});

// Close the database on application close
process.on("SIGINT", () => {
  server.close(() => {
    connection.end();
    console.log("\nClosing the connection to database, bye! 👋");
  });
});
