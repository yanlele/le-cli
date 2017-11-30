module.exports=function(program){
    const path = require('path')
    const webpack = require('webpack')
    const webpackDevServer = require('webpack-dev-server');

    const config = require(path.join(process.cwd(),"/webpack.config.js"))
    const compiler = webpack(config)

    var mock2easy = require('mock2easynew');

    const app = new webpackDevServer(compiler, {
        publicPath: config.output.publicPath,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8006',
                changeOrigin: true,
                pathRewrite: {'^/api' : ''}
            }
        }
    })

    var defaultConfig = {
        port: 8006,
        lazyLoadTime: 3000,
        database: 'mock2easy',
        doc: 'doc',
        keepAlive: true,
        isSpider: false,
        ignoreField: [],
        interfaceSuffix: '.json',
        preferredLanguage: 'ch'
    }

    mock2easy(defaultConfig, function(app) {
        app.listen(defaultConfig.port, function() {
            console.log(('mock2easy is starting , please visit : http://127.0.0.1:' + defaultConfig.port).bold.cyan);
        })
    })

    app.listen(8081, function() {
        console.log('Example app listening on port 8080!\n')
    })

};