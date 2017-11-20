'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//代码压缩的插件
const extractTextPlugin = require('extract-text-webpack-plugin');//这个是打包分离css的插件
const PurifyCSSPlugin = require('purifycss-webpack');//这个是优化css的一个东西
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var srcDir = path.resolve(process.cwd(), './src');
var assets = 'build/';
var projectJson = require('./package.json');
var excludeFromStats = [
    /node_modules[\\\/]/
];
const genEntries=require('./webapckUtils');


function webpackConfig(options){
    options=options||{};

    var debug = options.debug !== undefined ? options.debug : true;//是否是debug模式

    var entries = genEntries();

    var config={
        entry:entries,
        output:{
            path: path.resolve(debug ? '__build' : assets),
            filename: debug ? '[name].js' : 'scripts/[name].js',
            chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'scripts/[chunkhash:8].chunk.min.js',
            hotUpdateChunkFilename: debug ?'[id].[chunkhash:8].js' : 'scripts/[id].[chunkhash:8].min.js',

        }
    }
}