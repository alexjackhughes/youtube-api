import express from "express";
import axios from "axios";

import { generateUniqueId, checker, callYouTubeApi } from "./helper";
import connection from "../setupDatabase";
import filters from "../searchFilter";

const globalmtb = process.env.GLOBALMTB_ID;
const globalCyclingNetwork = process.env.GLOBALCYCLING_ID;

const router = express.Router();

/**
 * When hit will store YouTube video titles and publishedAt dates
 * for the GlobalCyclingNetwork and globalmtb YouTube channels
 * to our database.
 */
router.post("/youtube", async function(req, res) {
  try {
    const resolvedVideosForChannels = await axios.all([
      callYouTubeApi(globalmtb),
      callYouTubeApi(globalCyclingNetwork)
    ]);

    // Iterate through all the videos for each channel
    resolvedVideosForChannels.map(({ data }, index) => {
      data.items.map((video, index) => {
        const title = video.snippet.title;

        // Only add a video if it matches the search filter
        if (checker(title, filters)) {
          const id = generateUniqueId();
          const date = video.snippet.publishedAt;

          connection.query(
            `INSERT INTO videos (id,title,date) VALUES ('${id}','${title}','${date}')`,
            (error, results, fields) => {
              if (error) throw error;
            }
          );
        }
      });
    });

    res.send({
      code: 201,
      response: "Successfully added YouTube meta data to database!"
    });
  } catch (e) {
    res.send({
      code: 400,
      response: e.message
    });
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

export default router;
