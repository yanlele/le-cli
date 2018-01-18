const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 模块映射到输出 bundle 的过程
const ManifestPlugin = require('webpack-manifest-plugin');
// 打包地址
const buildPath = path.resolve(__dirname, './dist');
// 模板地址
const templateRoot = path.resolve(__dirname, './page');
// NODEJS FS 删除文件
let emptyDir = function (fileUrl) {
  let files = fs.readdirSync(fileUrl); //读取该文件夹
  files.forEach(function (file) {
      let stats = fs.statSync(fileUrl + '/' + file);
      if (stats.isDirectory()) {
          emptyDir(fileUrl + '/' + file);
      } else {
          fs.unlinkSync(fileUrl + '/' + file);
          console.log("删除文件 " + fileUrl + ' ````' + file + "```` 成功");
      }
  });
};
// 页面入口
const pageEntry = {};
// 页面模板
const pageHtml = [];
// 导航JSON
const navigation = {
  "navList": []
};
// 检查是否有打包目录
!fs.existsSync(buildPath) && fs.mkdirSync(buildPath);
// 读取文件目录
const pages = fs.readdirSync(templateRoot)
pages.forEach((name, index) => {
  // 页面入口配置
  const enterPath = path.join(templateRoot, name)
  pageEntry[name] = path.join(enterPath, 'entry.js')

  // 输出页面模板
  pageHtml.push(new HtmlWebpackPlugin({
    entryName: name,
    filename: `${name}.html`,
    template: `${enterPath}/index.html`,
    inject: false,
    minify: {
      removeComments: true,
      collapseWhitespace: true
    },
    chunks: ['main', 'common', name]
  }))

  // 输出导航JSON
  navigation.navList.push({
    "name": name,
    "href": `/${name}.html`
  })
  fs.writeFileSync(path.resolve(__dirname, './Navigation.json'), JSON.stringify(navigation));
})

module.exports = env => {
  const config = {publicPath: '/'}
  emptyDir(buildPath)
  if (env.NODE_ENV === 'build') {
    config.publicPath = './'
  }
  return {
    entry: Object.assign(pageEntry, {
      main: './public/main.js'
    }),
    // devtool: false,
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, './'),
      compress: true,
      inline: true,
      hot: true, // 模块热替换
      port: 9000,
    },
    plugins: [
      new ManifestPlugin(),
      new webpack.HotModuleReplacementPlugin(), // 模块热替换
      new webpack.optimize.CommonsChunkPlugin({ // 公共模块提取
        name: 'common'
      }),
      // 清理 项目之外无法清理 用nodejs清理文件
      // new CleanWebpackPlugin(buildPath),
    ].concat(pageHtml),
    output: {
      filename: 'js/[name]-[hash].bundle.js',
      path: buildPath,
      publicPath: config.publicPath
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ]
        }, {
          test: /\.(png|jpg|gif)$/,
          use: [
            'url-loader?limit=20000&name=[name]-[hash].[ext]&outputPath=images/',
            'image-webpack-loader'
          ]
        }, {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['latest']
            }
          },
          exclude: '/node_modules/',
          include: '/src/',
        }
      ]
    }
  }
}

