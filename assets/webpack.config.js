'use strict';

var genConf = require('./webpack.master.config');

module.exports = genConf({debug: false, htmlMin: true});
