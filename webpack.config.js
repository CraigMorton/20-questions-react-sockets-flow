const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: `${__dirname}/client/src/app.js`,
  output: {
    filename: 'bundle-[hash].js',
    path: `${__dirname}/client/build`,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new FaviconsWebpackPlugin(`${__dirname}/client/src/images/reactjs_logo.svg`),
    new HtmlWebpackPlugin({
      inject: 'head',
      template: `${__dirname}/client/src/templates/index.html`,
      filename: 'index.html',
    }),
    new ExtractTextPlugin({
      filename: (getPath) => getPath('[name]-[contenthash].css'),
    }),
    new CleanWebpackPlugin(
      [
        'client/build/*.js*',
        'client/build/*.css*',
      ],
      {
        watch: true,
      }
    ),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'flow'],
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread',
          ],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
          fallback: 'style-loader',
        }),
      },
      // {
      //   test: /(\.scss$|\.sass$)/,
      //   loader: ExtractTextPlugin.extract({
      //     use: [
      //       'style-loader',
      //       'css-loader',
      //       'sass-loader',
      //     ],
      //     fallback: 'style-loader',
      //   }),
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              name: '[name]-[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    ],
  },
}

