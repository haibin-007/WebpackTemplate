
# 多页面Webpack4脚手架

> Fork或借鉴请注明出处 [@ HeavenBin](https://github.com/HeavenBin/WebpackTemplate)  
> 如果觉得对你有帮助的话，请也不要吝啬你手中宝贵的Star,使劲砸向我吧！   
> 这将是对我最大的鼓励！！！✧(∗≧ꇴ≦)人(≧ꈊ≦∗)✧

## 项目构成
<pre>
├── build                        // webpack配置目录
│   ├── utils.js     		         // 工具文件
│   ├── config.js     		       // 配置文件
│   ├── webpack.config.base.js   // 基础构建
│   ├── webpack.config.dev.js    // 开发模式构建
│   ├── webpack.config.prod.js   // 生产模式构建
├── dist               		       // 生产目录
├── src                		       // 开发目录
├── .babelrc                		 // babel配置
├── .editorconfig                // editorconfig配置
├── .eslintignore                // eslint排除的检测范围
├── .eslintrc.js                 // eslint配置
├── postcss.config.js            // postcss配置
</pre>

## 技术栈
+ Webpack4：现代 JavaScript 应用程序的静态模块打包器  (自动化构建工具)
+ editorconfig：编辑器样式风格的统一配置             (统一代码风格工具)
+ eslint：JavaScript和JSX检查工具                  (TS/ES代码语法检测)
+ babel：JavaScript 语法转换器                     (TS/ES代码转换器)
+ postcss: 使用JavaScript转换CSS的工具              (CSS预处理平台)
+ 支持各种CSS扩展语言的转化及压缩：css、less、sass、stylus
+ 支持各种格式文件的预处理以及压缩：文字类、图片类、影音类
+ 之后还会加入: 单元测试、端对端测试、...

## 使用说明
> 需要NodeJS环境、git环境，
> 我所使用的版本：node v10.1.0 npm 6.3.0
1. 克隆库到本地
> HTTPS方式： git clone https://github.com/HeavenBin/WebpackTemplate.git    
> SSH方式：git clone git@github.com:HeavenBin/WebpackTemplate.git

2. cd WebpackTemplate 进入项目目录

3. 打开build/config.js文件根据自身要求进行自定义设置
```javascript
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
```
4. npm run build 构建dist生产目录

5. npm run dev   构建热更新服务

6. 开始进行开发
