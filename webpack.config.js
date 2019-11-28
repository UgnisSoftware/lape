const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { WebpackPluginServe: Serve } = require("webpack-plugin-serve");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./examples/app.tsx",
  output: {
    filename: "[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "public")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json"
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        },
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "examples"),
          path.resolve(__dirname, "src")
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new Serve({
      client: { silent: true },
      historyFallback: true,
      progress: false,
      port: 3000,
      static: path.resolve(__dirname, "public")
    })
  ],
  watch: true
};
