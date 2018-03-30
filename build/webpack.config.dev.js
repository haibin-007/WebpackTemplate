// 开发环境配置文件

const webpackBase = require('./webpack.config.base.js');    // 引入基础配置
const config = require('./config.js');                      // 引入配置

const webpack = require('webpack');                         // 用于引用官方插件
const webpackMerge = require('webpack-merge');              // 用于合并配置文件

const webpackDev = {  // 开发配置文件
  output: {
    publicPath: config.dev.assetsPublicPath,      // 相对于服务器根目录的路径，用于加载资源。
    filename: 'js/[name].[hash:8].bundle.js',     // 构建文件名
    chunkFilename: 'js/[id].[hash：8].js',        // 按需加载的文件名
  },

  devtool: config.dev.devtool,       // 开发环境设置sourceMap，生产环境不使用

  devServer: {                       // 启动devServer，不会在本地生成文件，所有文件会编译在内存中(读取速度快)
    contentBase: './dist',             // 目录下的内容可被访问
    historyApiFallback: true,          // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。true启用
    overlay: true,                     // 是否在浏览器中显示编译器错误
    inline: true,                      // 内联模式 实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
    clientLogLevel: "info",            // 内联模式 哪些构建消息将会出现在浏览器控制台
    hot: true,                         // 配合webpack.NamedModulesPlugin、webpack.HotModuleReplacementPlugin完成MHR
    compress: true,                    // 一切服务都启用gzip 压缩
    host: config.dev.host,
    port: config.dev.port,
    publicPath: config.dev.assetsPublicPath,
    useLocalIp: false,                  // 允许浏览器使用本地IP打开
    proxy: config.dev.proxyTable,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
      },
      {
        test: /\.postcss$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
      },
      {
        test: /\.less$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'less-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
      },
      {
        test: /\.sass$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: config.dev.devSourceMap } }]
      },
      {
        test: /\.scss$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'sass-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
      },
      {
        test: /\.stylus$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'stylus-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
      },
      {
        test: /\.styl$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'postcss-loader', options: { sourceMap: config.dev.devSourceMap } },
          { loader: 'stylus-loader', options: { sourceMap: config.dev.devSourceMap } }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({                   // 配置的全局常量 (指定为生产环境，进而让一些library可以做一些优化)
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),  // 启用热替换模块(Hot Module Replacement)，也被称为 HMR。
    new webpack.NamedModulesPlugin(),          // 开启HMR时显示模块的相对路径,建议用于开发环境
    new webpack.NoEmitOnErrorsPlugin(),        // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
  ]
};

module.exports = webpackMerge(webpackBase, webpackDev);
