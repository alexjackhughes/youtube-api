const fs = require("fs");

const filters = [];

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
