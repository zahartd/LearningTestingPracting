module.exports = {
    "plugins": [
      ["@babel/plugin-transform-runtime",
        {
          "regenerator": true
        }
      ]
    ],
    presets: [
        require("@babel/preset-env")
    ],
};