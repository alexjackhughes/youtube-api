const express = require("express");
const router = express.Router();

// Helper function
router.get("/", function(req, res) {
  res.send(
    "Your server is running!\nCheck out the docs for info on how to run the API:\nhttps://github.com/alexjackhughes/youtube-api"
  );
});

/**
 * When hit will store youtube video titles and publishedAt dates
 * for the GlobalCyclingNetwork and globalmtb YouTube channels
 * to our database.
 */
router.post("/youtube", function(req, res) {
  res.send("youtube example");
});

// Fetch any YouTube videos meta data that has been stored.
router.get("/youtube", function(req, res) {
  res.send("About example");
});

// Get a YouTube videos meta data by ID.
router.get("/youtube/:id", function(req, res) {
  res.send("About example");
});

// Search for all videos that match a keyword
router.get("/youtube/search/:search", function(req, res) {
  res.send("About example");
});

// Remove a YouTube videos meta data by ID.
router.delete("/youtube/:id", function(req, res) {
  res.send("About example");
});

module.exports = router;
