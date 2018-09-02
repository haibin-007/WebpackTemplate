# WebTemplate
Build the best web project template!

# 多页面Webpack脚手架

> Fork或借鉴请注明出处 [@ HeavenBin](https://github.com/HeavenBin/WebpackTemplate)  
> 如果觉得对你有帮助的话，请也不要吝啬你手中宝贵的Star,使劲砸向我吧！   
> 这将是对我最大的鼓励！！！✧(∗≧ꇴ≦)人(≧ꈊ≦∗)✧

## 项目构成
<pre>
├── build                        // webpack配置目录
│   ├── config.js     		       // 配置文件
│   ├── webpack.config.base.js   // 基础构建
│   ├── webpack.config.dev.js    // 开发模式构建
│   ├── webpack.config.prod.js   // 生产模式构建
├── dist               		       // 生产目录
├── src                		       // 开发目录
</pre>

## 使用说明
> 需要NodeJS环境、git环境

1. 打开build/config.js文件根据自身要求进行自定义设置
```javascript
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
    port: '3002',

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
```
2. npm run build 构建dist生产目录

3. npm run dev   构建热更新服务

4. 开始进行开发
