const webpack = require("webpack");
const path = require("path");
const yargs = require("yargs");
const libraryName = "interactive-charts";
const env = process.env.NODE_ENV;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname),
	target: 'web',
	entry: {
		dist: 'index.ts',
		style: 'lib/main.less',
		app: [
			'app/app.ts'
		]
	},
	output: {
		// TODO: npm run serve does not build
		path: path.join(__dirname, "dist"),
		filename: "../[name]/interactive-charts.js",
		library: libraryName,
		libraryTarget: "umd",
		umdNamedDefine: true,
		chunkFilename: "[id].chunk.js"
	},
	resolve: {
		modules: [path.resolve(__dirname), 'node_modules'],
		extensions: [".tsx", ".ts", ".js", '.css', 'html', 'less'],
		alias: {
			'node_modules': path.join(__dirname, 'node_modules')
		}
	},
	devtool: 'source-map', // 'eval'
	plugins: [
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery',
			'window.jQuery': 'jquery',
			_: 'lodash'
		}),
		new ExtractTextPlugin("../[name]/interactive-charts.css", {
            allChunks: true
        })
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader'
				}],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015'] }
				}],
				exclude: /node_modules/
			},
			{
				test: /\.ts$/, // TODO: restore tsc -p . && webpack..
				use: [{
					loader: 'ts-loader',
					options: { transpileOnly: true }
				}],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract(
					'css-loader?sourceMap!' +
					'less-loader?sourceMap'
				),
				exclude: /node_modules/
			},
			{
				test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
				use: 'file-loader',
			},
			{
				test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: 'url-loader?limit=10000',
			}
		],
		loaders: [
			{
				test: require.resolve('angular'),
				use: 'exports?window.angular'
			}
		]
	}
}
