const path = require("path");

module.exports = {
  entry: "./src/javascripts/entry.js",
  output: {
    path: path.resolve(__dirname, "src", "javascripts"),
    filename: "bundle.js",
  },
  devtool: "source-map",
};
