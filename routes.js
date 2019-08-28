var express = require("express");
var router = express.Router();

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

// Define the home page route
router.get("/", function(req, res) {
  res.send("home example");
});

// Define the about route
router.get("/about", function(req, res) {
  res.send("About example");
});

module.exports = router;
