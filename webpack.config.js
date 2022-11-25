const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')

const config = {
  mode: 'production',
  entry: {
    main: path.join(__dirname, 'src/index')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
  },
  module: {
    rules:[
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre' // 这里一定要配置，不然一堆报错，而且错误不在自己写的代码里
      },
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.l?[ec]ss$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
          },
        ],
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}

if (process.env.RUN_IN_BROWSER) {
  config.devServer = {
    historyApiFallback: true
  }
  config.plugins.push(new HtmlWebpackPlugin({
    title: 'papers-componsing',
    template: './index.html'
  }))
}

module.exports = config
