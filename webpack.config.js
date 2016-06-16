var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
      vendor: "./app/ts/vendor.ts",
      app: "./app/ts/app.ts"
  },
  output: {
      path: __dirname,
      filename: "[name].js"
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: __dirname + "/app/index.html"
      }),
      new ExtractTextPlugin("[name].css")
  ],
  resolve: {
      extensions:  ["", ".ts", ".js", ".css"]
  },
  module: {
      loaders: [
          {
              test: /\.ts$/,
              loaders: ["ts-loader"],
              exclude: /node_modules/
          },
          {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader", "css-loader")
          }
      ]
  }
};