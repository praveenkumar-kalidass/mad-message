const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    app: path.join(__dirname, "client/index.js")
  },
  output: {
    path: path.join(__dirname, "dist"),
    hashDigestLength: 10,
    filename: "scripts/[name].[hash].bundle.js"
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, "dist/index.html"),
      template: path.join(__dirname, "client/index.html")
    })
  ],
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
          name: "[hash].[ext]",
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
