const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: __dirname, 
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      test: /\.(js|jsx)$/,
      loader: 'babel-loader'
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }]
  },
  devServer: {
    historyApiFallback: true, 
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: false, //{ warnings: false },
      output: { comments: false },
      mangle: false, 
      sourcemap: true, 
      mininize: false, 
      // mangle: { except: ['$super', '$', 'exports', 'require', '$q', '$ocLazyLoad'] }
    }),
    new ExtractTextPlugin({filename: 'src/public/stylesheets/app.css', allChunks: true})
  ]
};

module.exports = config;