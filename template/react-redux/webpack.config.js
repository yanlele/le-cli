/**
 * create by yanle
 * create time 2018/12/11 下午4:19
 */

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');  // 安装本地webpack的时候，会给我们带上，所以不用单独安装
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
    devtool: 'cheap-module-source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            /*options: {
                                // minimize: true,
                                // modules: true,
                            }*/
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')(),
                                    require('cssnano')()
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            singleton: true
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: false,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            },
                            // loader: 'file-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[contenthash:5].css',                   // 输出路径
            allChunks: true
        }),

        /*new PurifyCSS({
            paths: glob.sync([ // 传入多文件路径
                path.resolve(__dirname, './src/index.html'), // 处理根目录下的html文件
                path.resolve(__dirname, './src/!*.js') // 处理src目录下的js文件
            ])
        }),*/
        new UglifyJSPlugin(),

        new webpack.DefinePlugin({                              // 指定三方模块的运行环境
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.HashedModuleIdsPlugin(),                    // 优化缓存
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    ]
};

module.exports = merge(commonConfig, publicConfig);