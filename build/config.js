'use strict'

const path = require('path')
const utils = require('./utils')

const config = {

  projectPath: utils.resolve('/'),                                  // 项目根目录
  srcPath: utils.resolve('/src/'),                                  // 源文件目录
  node_modulesPath: utils.resolve('/node_modules/'),                // node_modules目录

  htmlPath: utils.resolve('/src/'),                                 // HTML目录
  jsPath: utils.resolve('/src/main/'),                              // JS目录

  ignoreJs: ['test'],                                               // 没有入口js文件的html名
  assetsSubDirectory: utils.resolve('/src/static/'),                // 静态资源目录(不处理的第三方代码)

  dev: {
    host: 'localhost',
    port: '3002',

    useEslint: false,                                                // 是否使用ESlint
    showEslintErrorsInOverlay: true,                                 // 设置为true，ESlint-loader将始终返回警告。

    devSourceMap: false,                                             // 是否开启SourceMap
    devtool: 'eval-source-map',

    assetsPublicPath: '/',                                           // 相对于服务器根目录的路径，用于加载资源。

    proxyTable: {                                                    // proxy代理
      '/api': 'http://localhost:3000'
    }
  },

  build: {
    prodSourceMap: false,                                             // 是否开启SourcMap
    devtool: 'source-map',

    assetsRoot: path.resolve(__dirname, '../dist'),                  // 构建根目录
    assetsPublicPath: '/'                                            // 相对于服务器根目录的路径，用于加载构建好的资源。
  }

}

console.log('\n/-----配置信息-----/\n')
console.log(config)
console.log('\n/-----配置信息-----/\n')

module.exports = config
