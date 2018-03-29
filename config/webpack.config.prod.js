// 生产环境配置文件

const webpackBase = require('./webpack.config.base.js');     // 引入基础配置
const config = require('./config.js');                       // 引入配置

const webpack = require('webpack');                          // 用于引用官方插件
const webpackMerge = require('webpack-merge');               // 用于合并配置文件
const CleanWebpackPlugin = require('clean-webpack-plugin');  // 用于清除文件夹
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');   // 用于压缩文件

// 提取css，提取多个来源时，需要实例化多个，并用extract方法
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const cssExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-css.[contenthash:8].css',  // 直接导入的css文件，提取时添加-css标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});
const sassExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-sass.[contenthash:8].css', // 直接导入的sass文件，提取时添加-sass标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

const webpackProd = { // 生产配置文件
  output: {
    filename: 'js/[name].[chunkhash:8].bundle.js', // 生产环境用chunkhash
  },
  module: {        // 处理css scss
    rules: [{
      test: /\.css$/,                   // 生产环境提取css
      include: [config.srcPATH],       // 在源文件目录查询
      exclude: [config.vendorsPATH],   // 忽略第三方的任何代码
      use: cssExtracter.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true   //css压缩
          }
        }, 'postcss-loader'],
        publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
      })
    },
    {
      test: /\.scss$/,                  // 生产环境提取css
      include: [config.srcPATH],       // 在源文件目录查询
      exclude: [config.vendorsPATH],   // 忽略第三方的任何代码
      use: sassExtracter.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true  //css压缩
          }
        }, 'postcss-loader', 'sass-loader'],
        publicPath: '../',      // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
      })
    }
    ]
  },
  plugins: [
    cssExtracter,    // 生成css文件
    sassExtracter,   // 生成css文件
    new webpack.DefinePlugin({                   // 配置的全局常量 (指定为生产环境，进而让一些library可以做一些优化)
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HashedModuleIdsPlugin(),         // 根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
    new CleanWebpackPlugin(['./dist/'], {
      root: config.projectPATH,               // 默认为__dirname，所以需要调整
    }),
    new webpack.optimize.CommonsChunkPlugin({    // 抽取公共chunk
      name: 'commons',                           // 指定公共 bundle 的名称。HTMLWebpackPlugin才能识别
      filename: 'js/commons.[chunkhash:8].bundle.js'
    }),
    new UglifyJSPlugin(),
  ]
};

module.exports = webpackMerge(webpackBase, webpackProd);

