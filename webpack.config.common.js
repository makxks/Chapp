var webpack = require('webpack');

module.exports = {
  entry: {
    'app': './src/app/main.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      },
      {
        test: /\.css$/,
        use: [{ loader: 'raw-loader' }]
      },
      {
        test: /\.ts$/,
        use: [
        'awesome-typescript-loader',
        'angular2-template-loader',
        'angular-router-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=src/[name].[hash].[ext]'
      },
    ],
    exprContextCritical: false

  }
};
