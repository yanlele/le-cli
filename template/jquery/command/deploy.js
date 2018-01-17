var webpack = require('webpack');

var gulp = require('gulp');
var gutil = require('gulp-util');
var src = '../src';
var assets = '../build';
var webpackConf = require('../webpack.config');

function taskWebpack(done){

  webpack(webpackConf, function(err, stats) {
      if(err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString({colors: true}));
      done();
  });
}


function build(){
  var replace = require('gulp-replace');
  var htmlmin = require('gulp-htmlmin');
  var fileStream = gulp
      .src(assets + '/*.html')
      .pipe(replace(/<script(.+)?data-debug([^>]+)?><\/script>/g, ''));
  if(webpackConf.htmlMin) {
    fileStream = fileStream.pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }));
  }
  return fileStream.pipe(gulp.dest(assets));

  //此处源码注释，源码中html压缩是不可选的，不符合需要
  /*return gulp
      .src(assets + '/*.html')
      .pipe(replace(/<script(.+)?data-debug([^>]+)?><\/script>/g, ''))
      // @see https://github.com/kangax/html-minifier
      .pipe(htmlmin({
          collapseWhitespace: true,
          removeComments: true
      }))
      .pipe(gulp.dest(assets));*/
}




module.exports = function(program){

  //编译
  taskWebpack(build);

  // return gulp.src(process.cwd + '/src/**')
  //   .pipe();
  //     .pipe(sftp({
  //         host: '[remote server ip]',
  //         remotePath: '/www/app/',
  //         user: 'foo',
  //         pass: 'bar'
  //     }));
}