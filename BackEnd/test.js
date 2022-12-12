var fs = require("fs");

fs.readFile("mockData.txt", "utf-8", (err, data) => {
  console.log(data);
});