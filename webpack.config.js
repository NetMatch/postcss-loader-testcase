const path = require( "path" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const spy = require.resolve( "./build/sourcemap-spy" );

module.exports = ( env ) => {
	return {
		mode    : "development",
		devtool : "source-map",
		entry   : {
			"app" : path.resolve( "./src/app.js" )
		},
		output : {
			path     : path.resolve( "./dist" ),
			filename : "js/[name].js"
		},
		plugins : [
			new MiniCssExtractPlugin({
				filename : "style/[name].css"
			})
		],
		module : {
			rules : [{
				test : /\.scss$/i,
				use  : [{
					loader  : MiniCssExtractPlugin.loader,
					options : {}
				}, {
					loader  : "css-loader",
					options : { sourceMap: true }
				}, {
					loader  : spy,
					options : { title : "postcss-loader output" }
				}, {
					loader  : "postcss-loader",
					options : {
						ident     : "postcss",
						sourceMap : true,
						plugins   : () => [
							"autoprefixer"
						].map( plugin => require( plugin )())
					}
				}, {
					loader  : spy,
					options : { title : "postcss-loader input" }
				}, {
					loader  : "sass-loader",
					options : { sourceMap : true }
				}]
			}]
		}
	}
};
