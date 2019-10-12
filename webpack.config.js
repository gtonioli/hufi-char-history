const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
   entry: slsw.lib.entries,
   mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
   externals: [
      {
         'aws-sdk': 'commonjs aws-sdk'
      }
   ],
   optimization: {
      minimize: true
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader'
            }
         }
      ]
   },
   output: {
      libraryTarget: 'commonjs2',
      path: path.join(__dirname, '.webpack'),
      filename: '[name].js'
   }
};
