import axios from "axios";

/**
 * Generate unique ID based on the date (to the millesecond)
 * that the ID was generated + a random number so that it's always
 * unique.
 */
const generateUniqueId = () => {
  const randomId =
    Math.floor(1000 + Math.random() * 9000).toString() + Date.now().toString();

  // Make sure string is below maximum integer size
  const randomString = randomId.slice(0, 9);

  return randomString;
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

/**
 * Takes an ID and returns a promise which resolves
 * into the last 50 videos for the provided channel.
 *
 * @param {*} channelId Channel id
 */
const callYouTubeApi = channelId => {
  const googleSecretKey = process.env.GOOGLE_KEY;

  return axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${googleSecretKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`
  );
};

export { generateUniqueId, checker, callYouTubeApi };
