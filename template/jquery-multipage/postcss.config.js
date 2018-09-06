module.exports = {
  plugins: {
    'postcss-import': {},
    'autoprefixer': { browsers: ['ie>=8', '>1% in CN'] },
    'cssnano': {},
    'postcss-adaptive': { remUnit: 75, autoRem: true }
  }
}