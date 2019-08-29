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
  try {
    connection.query(`SELECT * FROM videos`, (error, results, fields) => {
      if (error) throw error;

      res.send({
        code: 200,
        response: results
      });
    });
  } catch (e) {
    res.send({
      code: 400,
      response: e.message
    });
  }
});

// Returns a specific YouTube video, queried by ID.
router.get("/youtube/:id", function(req, res) {
  try {
    const id = req.params.id;

    connection.query(
      `SELECT * FROM videos WHERE id=${id}`,
      (error, results, fields) => {
        if (error) throw error;

        res.send({
          code: 200,
          response: results
        });
      }
    );
  } catch (e) {
    res.send({
      code: 400,
      response: e.message
    });
  }
});

// Search for all videos that title's match a keyword
router.get("/youtube/search/:search", function(req, res) {
  try {
    const search = req.params.search;

    connection.query(
      `SELECT * FROM videos WHERE title LIKE '%${search}%'`,
      (error, results, fields) => {
        if (error) throw error;

        res.send({
          code: 200,
          response: results
        });
      }
    );
  } catch (e) {
    res.send({
      code: 400,
      response: e.message
    });
  }
});

// Remove a YouTube video, queried by ID.
router.delete("/youtube/:id", function(req, res) {
  try {
    const id = req.params.id;

    connection.query(
      `DELETE FROM videos WHERE id=${id}`,
      (error, results, fields) => {
        if (error) throw error;

        res.send({
          code: 204,
          response: undefined
        });
      }
    );
  } catch (e) {
    res.send({
      code: 400,
      response: e.message
    });
  }
});

export default router;
