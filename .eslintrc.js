// http://eslint.cn/docs/user-guide/configuring

module.exports = {

  root: true,                 // 限定配置文件的使用范围
  parser: 'babel-eslint',
  parserOptions: {             // 设置解析器选项
    // ecmaVersion: 2018
  },
  env: {                      // 指定代码运行的宿主环境
    browser: true,
  },
  extends:[                  // 指定eslint规范
    // 'plugin:vue/essential',
    'standard',
  ],
  // plugins: ['vue'],        // 引入插件

  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {                                 // 启用额外的规则或覆盖默认的规则
    // "extends": "eslint:recommended",    // 启用推荐规则
  },
  // "globals": { "var1": true,"var2": false }    // 配置全局变量
}

