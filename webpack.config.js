var path = require("path");
var webpack = require("webpack");
// var TransferWebpackPlugin = require("transfer-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

var nodeModulePath = path.resolve(__dirname, "node_modules");
var outputPath = path.resolve(__dirname, "public");
var srcPath = path.resolve(__dirname, "src");

module.exports = {
	entry: path.join(srcPath, "js/app/app.jsx")
  ,
	output: {
		path: path.join(outputPath, "js/app"),
		filename: "app.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				exclude: [nodeModulePath],
				loader: "react-hot"
			},
			{
				test: /\.jsx$/,
				exclude: [nodeModulePath],
				loader: "babel",
				query: {
					presets: ["react", "es2015"]
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	}
		// }),
		// new TransferWebpackPlugin([
		// 	{
		// 		from: "src/views",
		// 		to: "../../dist/views"
		// 	}
		// ]),
		new webpack.NoErrorsPlugin(),
		new BrowserSyncPlugin({
			proxy: 'http://localhost:3000',
			port: "7000",
		})
	],
	devtool: "eval-cheap-module-source-map"
};