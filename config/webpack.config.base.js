// 基础配置文件，包含了不同环境通用配置

const path = require('path'); // nodejs路径模块，用于读取路径
const fs = require('fs');     // nodejs文件模块，用于读取文件

const config = require('./config.js');  // 获取配置


//-------------------------------------处理HTML(html-webpack-plugin)
const HTMLWebpackPlugin = require('html-webpack-plugin');  // 用于生成html
// 获取所有html文件名的集合，用于生成入口
const getFileNameList = (path) => {
  let fileList = [];
  let dirList = fs.readdirSync(path);
  dirList.forEach(item => {
    if (item.indexOf('html') > -1) {
      fileList.push(item.split('.')[0]);
    }
  });
  return fileList;
};
let htmlDirs = getFileNameList(config.htmlPath); // 所有html文件名的集合


// 根据每个html文件来生成HTMLWebpackPlugin实例 和 入口列表
let HTMLPlugins = [];  // 保存HTMLWebpackPlugin实例
let Entries = {};      // 保存入口列表

htmlDirs.forEach((page) => { // 生成HTMLWebpackPlugin实例和入口列表
  let htmlConfig = {
    filename: `${page}.html`,                                 // 生成的html文件名
    template: path.join(config.htmlPath, `./${page}.html`)   // 原文件位置
  };

  let found = config.ignorePages.findIndex((val) => { return val === page; });

  if (found === -1) {         // 有入口js文件的html，添加本页的入口js和公用js，并将入口js写入Entries中
    htmlConfig.chunks = [page, 'commons'];                    // html文件绑定入口JS和公用JS
    Entries[page] = `./src/js/${page}.js`;                    // 每个HTML文件添加一个入口，除非设置不用
  } else {                    // 没有入口js文件，chunk为空
    htmlConfig.chunks = [];
  }

  const htmlPlugin = new HTMLWebpackPlugin(htmlConfig);
  HTMLPlugins.push(htmlPlugin);
});


module.exports = {
  context: config.projectPath,    // 入口、插件路径会基于context查找
  entry: Entries,
  output: {                        // 出口、打包路径，本地物理路径
    path: config.buildPath,
  },
  module: {                        // 处理字体，生成图片，JS babel
    rules: [{
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      include: [config.srcPath],        // 在源文件目录查询
      exclude: [config.vendorsPath],    // 忽略第三方的任何代码
      use: [{ // 导入字体文件，并最打包到output.path+ options.name对应的路径中
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }]
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      include: [config.srcPath],        // 在源文件目录查询
      exclude: [config.vendorsPath],    // 忽略第三方的任何代码
      use: [{ // 图片文件小于8k时编译成dataUrl直接嵌入页面，超过8k回退使用file-loader
        loader: 'url-loader',
        options: {
          limit: 8192, // 8k
          name: 'img/[name].[ext]', // 回退使用file-loader时的名称
          fallback: 'file-loader',  // 当超过8192byte时，会回退使用file-loader
        }
      }]
    }, {
      test: /\.js$/,
      include: [config.srcPath],        // 在源文件目录查询
      exclude: [config.vendorsPath, config.node_modules_Path],
      use: ['babel-loader']
    }]
  },
  plugins: [                       // 生成HTML文件
    ...HTMLPlugins, // 扩展运算符生成所有HTMLPlugins
  ]
};
