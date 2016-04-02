var path = require("path");
var webpack = require("webpack");
var nodeModulePath = path.resolve(__dirname,"node_modules");
var outputPath = path.resolve(__dirname,"dist");
var srcPath = path.resolve(__dirname,"src");

module.exports = {
	entry: path.join(srcPath,"app.js"),
	output: {
		path: outputPath,
		filename: "bundle.js"
	},
	module: {
		test: /(.js|.jsx)$/,
		loader: "babel",
		exclude: [nodeModulePath],
		query: {
			presets: ["es2015","react"]
		}
	},
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],
	devtool: "source-map"
};