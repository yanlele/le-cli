const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpack = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const path = require('path');
const fse = require('fs-extra');

module.exports = {
    entry: {
        app: './app/pages/01、test/index.ts'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash:5].js',
        publicPath: '/',
        chunkFilename: '[name].bundle.js',              //动态打包文件名
    },

    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    devtool: 'source-map',

    devServer: {
        port: 3000,
        /*proxy: {
            '/': {
                target: 'http://localhost:3002',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: {
                    '': '/api/'
                }
            }
        },*/
        hot: true,
        hotOnly: true,
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
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
                            options: {
                                minimize: false,
                                modules: false,
                            }
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
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')(),
                                    // require('cssnano')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 10,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    // useRelativePath: true,
                                    // publicPath: '../img',
                                    outputPath: 'img',
                                }
                            }
                        }
                    },
                    {
                        loader: 'img-loader'
                    }
                ]
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024 * 50,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    // useRelativePath: true,
                                    // publicPath: '../fonts',
                                    outputPath: 'fonts',
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: ['img:src', 'img:data-src']
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new ExtractTextWebpackPlugin({
            filename: 'css/[name].[hash].css',                   // 输出路径
            allChunks: false
        }),

        new CleanWebpack(path.resolve(__dirname, 'dist')),

        new webpack.optimize.CommonsChunkPlugin({               // 提取三方生成的代码, 包括模块代码
            names: [ 'mainfest'],
            minChunks: Infinity
        }),

        // new PurifyCSS({
        //     paths: glob.sync([
        //         path.join(__dirname, './app/*.html'),
        //         path.join(__dirname, './app/*.js')
        //     ]),
        // }),

        new webpack.optimize.UglifyJsPlugin()
    ]
};
