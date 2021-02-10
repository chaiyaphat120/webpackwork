const { resolve } = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
    const CSSExtract = new ExtractTextPlugin('styles.css')
    return{
        entry: './src/index.js',
        output: {
          filename: 'bundle.js',
          path: resolve(__dirname, 'public'),
        },
        module: {
          rules: [
            {
              loader: 'babel-loader',
              test: /\.(js|jsx)$/,
              exclude: /node_modules/
            },{
              test: /\.css$/,
              use: CSSExtract.extract({
                use: [
                  'css-loader'
                ]
              })
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
              },
          ],
        },
        plugins:[
            new HtmlWebpackPlugin({
              excludeChunks: ['bundle'],
              'template': './template/template.html'
            }),
            CSSExtract,
            new CompressionPlugin({
              algorithm: 'gzip',
              threshold: 10240,
              minRatio: 0.8
            })
        ]
    }
}