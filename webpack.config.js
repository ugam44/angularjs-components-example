/// <binding />
var path = require('path');
var resolve = path.resolve;
var WebpackNotifierPlugin = require("webpack-notifier");
var AssetsPlugin = require('assets-webpack-plugin');
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");
'use strict';

var babelOptions = {
    "presets": [
      [
        "es2015",
        {
            "modules": false
        }
      ],
      "es2016"
    ]
};

module.exports = [{
    cache: true,
    context: "./app",
    devtool: "source-map",
    entry: {
        index: './index.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist/scripts'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              {
                  loader: 'babel-loader',
                  options: babelOptions
              },
              {
                  loader: 'ts-loader'
              }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                  loader: 'babel-loader',
                  options: babelOptions
              }
            ]
        }]
    },
    plugins: [
        new WebpackCleanupPlugin({})
    ],
    resolve: {
        extensions: ['.ts', '.js'],
        // alias: {
        //     Datatables$: path.resolve(__dirname, "./Scripts/datatables-package.js"),
        //     DtStickyHeaders: path.resolve(__dirname, "./Scripts/dt-sticky-headers-1.0.0.js"),
        //     MakeSticky$: path.resolve(__dirname, "./Scripts/jq-make-sticky-1.1.0.js"),
        //     DotDotDot$: path.resolve(__dirname, "./Scripts/jquery.dotdotdot.js"),
        //     DateHelper$: path.resolve(__dirname, "./Scripts/datehelper-1.0.0.js"),
        //     JointToggleButtons$: path.resolve(__dirname, "./Scripts/jointtogglebuttons-1.0.0.js"),
        //     KeyTrapper$: path.resolve(__dirname, "./Scripts/jq-key-trapper.js"),
        //     FileSaver$: path.resolve(__dirname, "./Scripts/file-saver.js"),
        //     Scripts: path.resolve(__dirname, "./Scripts"),
        //     "jquery-ui": path.resolve(__dirname, "./node_modules/jquery-ui/ui/")
        // }
    }
}];