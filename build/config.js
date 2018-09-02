'use strict'
// 全局配置，比如 HTML 文件的路径、publicPath 等
const path = require('path');

// __dirname是当前文件所在目录，process.cwd()是node当前工作的目录，即package.json所在目录
const projectPath = process.cwd();   // 项目目录

const config = {
  projectPath,                                                      // 项目根目录
  srcPath: path.join(projectPath, './src/'),                        // 源文件目录
  node_modulesPath: path.join(projectPath, './node_modules/'),      // node_modules目录
  htmlPath: path.join(projectPath, './src/'),                       // HTML目录
  jsPath: './src/js/',                                              // JS目录
  ignoreJs: ['test'],                                               // 没有入口js文件的html名
  assetsSubDirectory: path.join(projectPath, './src/static'),       // 静态资源目录(不处理的第三方代码)

  dev: {
    host: 'localhost',
    port: '3003',

    devSourceMap: false,                                             // 是否开启SourceMap
    devtool: 'eval-source-map',

    assetsPublicPath: '/',                                           // 相对于服务器根目录的路径，用于加载资源。

    proxyTable: {                                                    // proxy代理
      "/api": "http://localhost:3000"
    },
  },
  build: {
    prodSourceMap: false,                                             // 是否开启SourcMap
    devtool: 'source-map',

    assetsRoot: path.resolve(__dirname, '../dist'),                 // 构建根目录
    assetsPublicPath: '/',                                          // 相对于服务器根目录的路径，用于加载资源。
  },

};

console.log('\n/-----配置信息-----/\n');
console.log(config);
console.log('\n/-----配置信息-----/\n');

module.exports = config;
