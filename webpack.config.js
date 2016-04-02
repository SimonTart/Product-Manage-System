var path = require("path");
var webpack = require("webpack");
var TransferWebpackPlugin = require("transfer-webpack-plugin");

var nodeModulePath = path.resolve(__dirname,"node_modules");
var outputPath = path.resolve(__dirname,"dist");
var srcPath = path.resolve(__dirname,"src");

module.exports = {
	entry: path.join(srcPath,"scripts/app.js"),
	output: {
		path: path.join(outputPath,"scripts"),
		filename: "app.js"
	},
	module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: [nodeModulePath],
	      loader: ["babel"],
	      query:{
	      	presets:["es2015","react"]
	      }
	    }
	  ]
	},
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new TransferWebpackPlugin([
			{
				from: "./",
				to: "../dist"
			},
			path.join(__dirname,"src")
		])
	],
	devtool: "source-map"
};