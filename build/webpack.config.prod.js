// 生产环境配置文件

const webpackBase = require('./webpack.config.base.js');     // 引入基础配置
const config = require('./config.js');                       // 引入配置

const webpack = require('webpack');                          // 用于引用官方插件
const webpackMerge = require('webpack-merge');               // 用于合并配置文件
const CleanWebpackPlugin = require('clean-webpack-plugin');  // 用于清除文件夹
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');   // 用于压缩js文件
const CopyWebpackPlugin = require('copy-webpack-plugin');     // 用于拷贝文件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 提取css，提取多个来源时，需要实例化多个，并用extract方法

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)


const cssExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-css.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

const postcssExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-postcss.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

const lessExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-less.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

const sassExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-sass.[hash:7].css', // 直接导入的sass文件，提取时添加-sass标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

const scssExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-scss.[hash:7].css', // 直接导入的sass文件，提取时添加-sass标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

const stylusExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-stylus.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});

const stylExtracter = new ExtractTextWebpackPlugin({
  filename: './css/[name]-styl.[hash:7].css',  // 直接导入的css文件，提取时添加-css标识
  allChunks: true,  // 从所有的chunk中提取，当有CommonsChunkPlugin时，必须为true
});


const webpackProd = { // 生产配置文件
  output: {
    publicPath: config.build.assetsPublicPath,         // 相对于服务器根目录的路径，用于加载资源。
    filename: 'js/[name].[chunkhash:7].bundle.js',     // 构建文件名
    chunkFilename: 'js/[id].[chunkhash:7].js',        // 按需加载的文件名
  },
  // 是否开启 sourceMap
  devtool: config.build.prodSourceMap ? config.build.devtool : false,
  module: {        // 处理css scss
    rules: [
      {
        test: /\.css$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: cssExtracter.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
          ],
          publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
      },
      {
        test: /\.postcss$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: postcssExtracter.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } }
          ],
          publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
      },
      {
        test: /\.less$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: lessExtracter.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'less-loader', options: { sourceMap: config.dev.prodSourceMap } }
          ],
          publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
      },
      {
        test: /\.sass$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: sassExtracter.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'sass-loader', options: { indentedSyntax: true, sourceMap: config.dev.prodSourceMap } }
          ],
          publicPath: '../',       // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
      },
      {
        test: /\.scss$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: scssExtracter.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'sass-loader', options: { sourceMap: config.dev.prodSourceMap } }
          ],
          publicPath: '../',      // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
      },
      {
        test: /\.stylus$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: stylusExtracter.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'stylus-loader', options: { sourceMap: config.dev.prodSourceMap } }
          ],
          publicPath: '../',      // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
      },
      {
        test: /\.styl$/,
        include: [config.srcPath],
        exclude: [config.assetsSubDirectory],
        use: stylExtracter.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'postcss-loader', options: { sourceMap: config.dev.prodSourceMap } },
            { loader: 'stylus-loader', options: { sourceMap: config.dev.prodSourceMap } }
          ],
          publicPath: '../',      // 默认发布路径会是css，会拼接成css/img/x.png，所以需要重置
        })
      }
    ]
  },
  mode: 'production',
  plugins: [

    // new webpack.DefinePlugin({                   // 配置的全局常量 (指定为生产环境，进而让一些library可以做一些优化)
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),

    // new UglifyJSPlugin({                         // 压缩JS
    //   sourceMap: config.build.prodSourceMap,
    //   parallel: true,      // 使用多进程并行运行和文件缓存来提高构建速度
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false  // 在删除不可用代码或未使用的声明等时显示警告
    //     }
    //   },
    // }),

    // new webpack.optimize.ModuleConcatenationPlugin(), // 使范围提升,提升你的代码在浏览器中的执行速度

    // new webpack.NoEmitOnErrorsPlugin()  //编译时出现错误时，使用跳过发射阶段。这可确保不会发出错误资产

    // 提取CSS
    cssExtracter,
    postcssExtracter,
    lessExtracter,
    sassExtracter,
    scssExtracter,
    stylusExtracter,
    stylExtracter,
    // 压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      canPrint: true
    }),

    // 根据模块的相对路径生成一个四位数的hash作为模块id, 建议用于生产环境
    // 当供应商模块不变时，保持module.id稳定
    new webpack.HashedModuleIdsPlugin(),

    // 优化chunk
    new webpack.optimize.SplitChunksPlugin({
      chunks: "all",                   // 哪些块进行优化，"initial"|"all"|"async"(默认) (string function)
      minSize: 2000,                   // 要生成的块的最小大小，默认3000
      minChunks: 1,                    // 分割前必须共享模块的最小块数，默认1
      maxAsyncRequests: 5,             // 最大异步并行请求数，默认5
      maxInitialRequests: 3,           // 最大初始化并行请求书，默认3
      automaticNameDelimiter: '~',     // 生成的名称分隔符，默认~  (string)
      name: true,                      // 拆分快的名称，默认true(function true string)
      cacheGroups: {                   // 缓存组，可以继承和/或覆盖任何选项
        // priority: 0,                   // 缓存组的优先级，默认0
        // test: null,                    // 控制此缓存组选择的模块，默认空(function RegExp string)
        // reuseExistingChunk: true,      // 如果当前块包含已从主束拆分的模块，是否重用它。
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          name: 'default',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        }
      }
    }),

    // 删除dist文件夹
    new CleanWebpackPlugin(['./dist/'], {
      root: config.projectPath,               // 默认为__dirname，所以需要调整
    }),

    // 复制静态资源
    new CopyWebpackPlugin([
      {
        from: config.assetsSubDirectory,
        to: '../dist/static',
        ignore: ['.*']
      }
    ]),
  ]
};

module.exports = webpackMerge(webpackBase, webpackProd);

