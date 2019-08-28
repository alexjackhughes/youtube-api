import express from "express";
import axios from "axios";

const router = express.Router();
import connection from "./setupDatabase";

const googleSecretKey = process.env.GOOGLE_KEY;
const globalmtb = process.env.GLOBALMTB_ID;
const globalCyclingNetwork = process.env.GLOBALCYCLING_ID;

// Helper route providing a link to the docs.
router.get("/", function(req, res) {
  res.send(
    `Your server is running!
    \nCheck out the docs for info on how to run the API:
    \nhttps://github.com/alexjackhughes/youtube-api`
  );
});

/**
 * Takes an ID and returns a promise which resolves
 * into the last 20 videos for the provided channel.
 *
 * @param {*} channelId Channel id
 */
const callYouTubeApi = channelId => {
  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${googleSecretKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`
  );
};

/**
 * When hit will store youtube video titles and publishedAt dates
 * for the GlobalCyclingNetwork and globalmtb YouTube channels
 * to our database.
 */
router.post("/youtube", async function(req, res) {
  try {
    // Call both YouTube channels concurrently
    const resolvedYouTubeData = await axios.all([
      callYouTubeApi(globalmtb),
      callYouTubeApi(globalCyclingNetwork)
    ]);

    // Iterate through each video for each channel
    // and add it to the database
    resolvedYouTubeData.map(({ data }) => {
      data.items.map(video => {
        console.log("video", video);
      });
    });
  } catch (e) {
    throw e;
  }
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
