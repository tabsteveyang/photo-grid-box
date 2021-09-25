const webpack = require('webpack');
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function () {
  return {
    entry: path.join(__dirname, "src", "js", "index.js"),
    output: {
      path: path.join(__dirname, "build"),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.(sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@js': path.resolve(__dirname, '..', 'src/js/'),
        '@scss': path.resolve(__dirname, '..', 'src/scss/'),
        '@components': path.resolve(__dirname, '..', 'src/js/components/'),
        '@dev': path.resolve(__dirname, 'dev/'),
        '@build': path.resolve(__dirname, '..', 'build/')
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDom: 'react-dom',
        PropTypes: 'prop-types'
      }),
      new HtmlWebpackPlugin({
        minify: false,
        template: '/dev/src/template/index.html',
        filename: 'index.html'
      })
    ],
    mode: 'development',
    devtool: 'source-map'
  }
};