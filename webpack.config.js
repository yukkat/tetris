var webpack = require("webpack");

module.exports = {
    entry: "./js/require",
    resolve: {
        modulesDirectories: [
            "./js/modules"
        ]
    },
    output: {
        publicPath: "js/js/",
        filename: "main.js"
    }
};