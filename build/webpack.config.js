const path = require('path')
const resolve = fileName => path.resolve(__dirname, '../', fileName)

module.exports = {
  mode: "production",
  entry: {
    'index': resolve('./src/index.js')
  },
  output: {
    path: resolve('./lib'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
