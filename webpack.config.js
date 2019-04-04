const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    app: path.join(__dirname, "client/index.js")
  },
  output: {
    path: path.join(__dirname, "public"),
    filename: "scripts/[name].bundle.js"
  },
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "public/index.html"),
      template: path.join(__dirname, "client/index.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    historyApiFallback: true,
    hot: true,
    open: true
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          babelrc: false,
          plugins: [
            "transform-object-rest-spread",
            "transform-class-properties"
          ],
          presets: [
            "env",
            "react"
          ]
        }
      }
    }, {
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader"
      ]
    }, {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader"
      ]
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "images/"
        }
      }]
    }, {
      test: /\.(eot|otf|ttf|woff|woff2)$/,
      use: [
        "file-loader"
      ]
    }]
  }
};

module.exports = config;
