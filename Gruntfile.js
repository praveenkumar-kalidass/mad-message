const path = require("path");
const devConfig = require("./webpack.config");
const prodConfig = require("./webpack.production.config");

const gruntTask = (grunt) => {
  grunt.initConfig({
    "clean": [
      path.join(__dirname, "public/*")
    ],
    "webpack": {
      build: prodConfig
    },
    "webpack-dev-server": {
      options: {
        webpack: devConfig
      },
      start: devConfig.devServer
    }
  });

  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-webpack");

  grunt.registerTask("dev", [
    "clean",
    "webpack-dev-server:start"
  ]);

  grunt.registerTask("build", [
    "clean",
    "webpack:build"
  ]);
};

module.exports = gruntTask;
