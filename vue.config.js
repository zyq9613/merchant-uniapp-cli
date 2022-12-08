const TransformPages = require('uni-read-pages')
const {webpack} = new TransformPages();

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
	transpileDependencies: ['uview-ui','uni-simple-router','z-paging','@dcloudio/uni-ui'],
	configureWebpack: {
		plugins: [
			new webpack.DefinePlugin({
				ROUTES: webpack.DefinePlugin.runtimeValue(() => {
					const tfPages = new TransformPages({
						includes: ['path', 'name', 'meta']
					});
					return JSON.stringify(tfPages.routes)
				}, true )
			})
		]
	}
	// configureWebpack: (config) => {
	// 	config.plugins = [
	// 		new webpack.DefinePlugin({
	// 			ROUTES: webpack.DefinePlugin.runtimeValue(() => {
	// 				const tfPages = new TransformPages({
	// 					includes: ['path', 'name', 'meta']
	// 				});
	// 				return JSON.stringify(tfPages.routes)
	// 			}, true )
	// 		})
	// 	];
	//     // if (process.env.NODE_ENV === "production") {
	// 	//   config.plugins.push(
	// 	// 	new CompressionPlugin({
	// 	// 	  filename: "[path][base].gz",
	// 	// 	  algorithm: "gzip",
	// 	// 	  test: /\.(js|css|html)$/,
	// 	// 	  threshold: 10240,
	// 	// 	  minRatio: 0.8,
	// 	// 	  deleteOriginalAssets: false,
	// 	// 	}),
	// 	// 	new BundleAnalyzerPlugin()
	// 	//   );
	   
	//     // }
	// }
}