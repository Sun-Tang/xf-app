const env = process.env.NODE_ENV;
module.exports = {
	publicPath: './',
	lintOnSave: env !== 'production',
	productionSourceMap: false,
	devServer: {
		proxy: {
			'/api': {
				target: "http://backend-api-01.newbee.ltd",
			}
		}
	}
}