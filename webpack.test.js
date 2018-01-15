var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js']
  },

  resolveLoader: {
    moduleExtensions: ['-loader'] // To bypass mocha-loader incompatibility with webpack :
                                  // mocha-loader still using loaders without the "-loader" suffix,
                                  // which is forbidden with webpack v2
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('todochat', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('todochat', 'src/app'),
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        include: helpers.root('todochat', 'src/app'),
        loader: 'raw-loader'
      },
      {
        test: /\.sass$/,
        exclude: helpers.root('todochat', 'src/app'),
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('todochat'), // location of your src
      {} // a map of your routes
    )
  ]
}