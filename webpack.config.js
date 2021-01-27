const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main/index.ts",
  output: {
    path: path.join(__dirname, "public/js"),
    publicPath: "/public/js",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  devServer: {
    contentBase: "./public",
    writeToDisk: true,
    historyApiFallback: true,
  },
  externals: {
    vue: "Vue",
  },
  plugins: [new CleanWebpackPlugin()],
};
