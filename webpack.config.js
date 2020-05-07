//Import path module
const path = require("path");

module.exports = {
  // Resolve to output directory and set file
  output: {
    path: path.resolve("dist/assets"),
    filename: "bundle.js",
    publicPath: "assets",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
