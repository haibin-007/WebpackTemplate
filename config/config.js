'use strict'
// 全局配置，比如 HTML 文件的路径、publicPath 等
const path = require('path');

// __dirname是当前文件所在目录，process.cwd()是node当前工作的目录，即package.json所在目录
const projectPath = process.cwd();   // 项目目录

const config = {
  projectPath,                                                      // 项目目录
  configPath: path.join(__dirname),                                 // 配置文件目录
  srcPath: path.join(projectPath, './src/'),                        // 源文件目录
  buildPath: path.join(projectPath, './dist/'),                     // 打包目录
  publicPath: '/assets/',                                           // 静态文件存放目录

  htmlPath: path.join(projectPath, './src/html/'),                  // html目录
  ignorePages: ['test'],                                            // 标识没有入口js文件的html

  vendorsPath: path.join(projectPath, './src/vendors/'),           // vendors目录(不处理的第三方代码)
  node_modules_Path: path.join(projectPath, './node_modules/'),    // node_modules目录

  DEV_HOST: 'localhost',
  DEV_PORT: '3002',
  DEV_DEVTOOL: 'cheap-module-eval-source-map'
};

console.log('\n/-----相关路径-----/\n');
console.log(config);
console.log('\n/-----相关路径-----/\n');

module.exports = config;
