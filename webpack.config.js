var path = require('path');

var webpack = require('webpack');

var packageData = require('./package.json');

var isProduction = process.env.NODE_ENV === 'production';

var filename;
var plugins;
var outputPath;

if (isProduction) {
    outputPath = 'build/production/client/js';
    filename = `${packageData.name}.${packageData.version}.min.js`;
    plugins = [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ];
}
else {
    outputPath = 'build/dev/client/js';
    filename = `${packageData.name}.${packageData.version}.js`;
    plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"'
            }
        })
    ];
}


module.exports = {
    entry: path.resolve(__dirname, packageData['main:client']),
    devServer: {
      hot: true,
      inline: true,
      port: 7700,
      historyApiFallback: true,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
    output: {
        path: path.resolve(__dirname, outputPath),
        filename: filename,
        publicPath: 'http://localhost:7700/dist',
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
    externals: {
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
          query: {
            presets: ['react', 'es2015', 'stage-0'],
          },
        },
      ]
    },
    plugins: plugins
}
