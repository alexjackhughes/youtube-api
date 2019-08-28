const fs = require("fs");

const filters = [];

/**
 * This file will read the file 'search_filter' line by line
 * and add each line to an array, which is then exported.
 */
try {
  const path = process.env.FILTER_FILE_PATH;
  const lineReader = require("readline").createInterface({
    input: require("fs").createReadStream(path)
  });

  if (fs.existsSync(path)) {
    lineReader.on("line", function(line) {
      filters.push(line);
    });
  }
} catch (err) {
  console.error(err);
}

export default filters;
