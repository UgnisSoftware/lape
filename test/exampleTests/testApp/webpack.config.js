const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/app.tsx",
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
    alias: {
      lape: path.resolve(__dirname, "../../../src/index"),
      react: path.resolve(__dirname, "./node_modules/react/cjs/react.development.js"),
    },
  },
  output: {
    publicPath: "/",
    filename: "[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    clientLogLevel: "silent",
  },
};
