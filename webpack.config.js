const path = require("path");
const webpack = require("webpack");

module.exports = {
  plugins: [ 
    new webpack.ProvidePlugin({ 
      "jQuery": "jquery", 
      "window.jQuery": "jquery", 
      "jquery": "jquery", 
      "window.jquery": "jquery", 
      "$": "jquery", 
      "window.$": "jquery" 
    }) 
  ],
    
  entry: {
    index: "./src/js/index.js",
    cheat_sheet: "./src/js/cheat_sheet.js",
    catalog: "./src/js/catalog.js",
    quiz: "./src/js/quiz.js"
  },

  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            presets: [
              ["@babel/preset-env", { modules: false }]
            ]
          }
        }
      }
    ]
  },

  resolve: {
    alias: {
      "%modules%": path.resolve(__dirname, "src/blocks/modules"),
      "%components%": path.resolve(__dirname, "src/blocks/components"),
      "%node_modules%": path.resolve(__dirname, "node_modules")
    }
  }
};
