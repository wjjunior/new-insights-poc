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
    extensions: [".ts", ".js", ".vue", ".scss"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
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
