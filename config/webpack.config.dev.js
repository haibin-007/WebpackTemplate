// 开发环境配置文件

const webpackBase = require('./webpack.config.base.js');    // 引入基础配置
const config = require('./config.js');                      // 引入配置

const webpack = require('webpack');                         // 用于引用官方插件
const webpackMerge = require('webpack-merge');              // 用于合并配置文件

const webpackDev = {  // 开发配置文件
  output: {
    filename: 'js/[name].[hash:8].bundle.js',  // 开发环境用hash
  },
  devtool: config.DEV_DEVTOOL,       // 开发环境设置sourceMap，生产环境不使用
  devServer: {                   // 启动devServer，不会在本地生成文件，所有文件会编译在内存中(读取速度快)
    contentBase: './dist/',         // 目录下的内容可被访问
    overlay: true,                  // 错误信息直接显示在浏览器窗口中
    inline: true,                   // 实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
    hot: true,                      // 配合webpack.NamedModulesPlugin、webpack.HotModuleReplacementPlugin完成MHR
    host: config.DEV_HOST,
    port: config.DEV_PORT,
    publicPath: config.publicPath,  // 静态资源存放位置，根目录的assets文件夹，确保publicPath总是以斜杠(/)开头和结尾。可以设置为CDN地址。这个选项类似url-prefix
    useLocalIp: false,              // 使用本机IP打开devServer，而不是localhost
    proxy: {                        // 可以通过proxy代理其他服务器的api
      "/api": "http://localhost:3000"
    }
  },
  module: {
    rules: [{
      test: /\.css$/,      // 开发环境不提取css
      include: [config.srcPath],
      exclude: [config.vendorsPath],
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /\.scss$/,     // 开发环境不提取css
      include: [config.srcPath],
      exclude: [config.vendorsPath],
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),          // 开启HMR时显示模块的相对路径,建议用于开发环境
    new webpack.HotModuleReplacementPlugin(),  // 启用热替换模块(Hot Module Replacement)，也被称为 HMR。
  ]
};

module.exports = webpackMerge(webpackBase, webpackDev);