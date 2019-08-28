import express from "express";
import axios from "axios";

const router = express.Router();
import connection from "./setupDatabase";

const googleSecretKey = process.env.GOOGLE_KEY;
const globalmtb = process.env.GLOBALMTB_ID;
const globalCyclingNetwork = process.env.GLOBALCYCLING_ID;

const generateId = () => {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
};

/**
 * Takes a title and an array of search queries,
 * if the title partially matches any of the search queries
 * then return true, otherwise return false
 *
 * @param {*} title
 * @param {*} searchQueries
 */
function checker(title, searchQueries) {
  const titleMatchesQuery = searchQueries.filter(search => {
    if (title.indexOf(search) > -1) {
      return title;
    }
  });

  return titleMatchesQuery[0] ? true : false;
}

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
    `https://www.googleapis.com/youtube/v3/search?key=${googleSecretKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`
  );
};

/**
 * When hit will store youtube video titles and publishedAt dates
 * for the GlobalCyclingNetwork and globalmtb YouTube channels
 * to our database.
 */
router.post("/youtube", async function(req, res) {
  try {
    // We need to filter items by the read file
    const searchQueries = ["Jeremy"];

    // Call both YouTube channels concurrently
    const resolvedVideosForChannels = await axios.all([
      callYouTubeApi(globalmtb),
      callYouTubeApi(globalCyclingNetwork)
    ]);

    // Iterate through all the videos for each channel
    resolvedVideosForChannels.map(({ data }) => {
      data.items.map(video => {
        const title = video.snippet.title;

        // If a video title matches the search filter,
        // add it to database
        if (checker(title, searchQueries)) {
          const id = generateId();
          const publishedAt = video.snippet.publishedAt;

          console.log(title);
        }
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
