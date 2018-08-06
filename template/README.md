# {{ name }}

> {{ description }}

## 项目唯一不受控的配置文件(config/index.js)

> 创建 config/index.js 文件，复制以下内容，即可运行项目

```javascript

'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

const commonProxy = {
  // target: 'http://trial.hitour.cc',
  // target: 'https://test.wantu.cn',
  // target: 'http://dev.hitour.cc',
  // target: 'http://test.hitour.cc',
  // target: 'http://sandbox.hitour.cc',
  // target: 'https://www.wantu.cn',
  target: '',
  changeOrigin: true,
  pathRewrite: {}
};

{{#if_in options "mandy"}}
const devDeploy = {
  // target: '/home/app/git/trial/hitour.server/hitour/themes/v3/dist/hk_m'
  // target: '/home/app/git/test/hitour.server/hitour/themes/v3/dist/hk_m'
  // target: '/home/app/git/test.wantu.cn/hitour.server/hitour/themes/v3/dist/hk_m'
  // target: '/home/app/git/hitour.server/hitour/themes/v3/dist/hk_m'
  target: ''
}

const prodDeploy = {
  password: '',
  target: ''
}{{/if_in}}
{{#if_in options "qiniu"}}

const qiniuDeploy = {
  accessKey: '',
  secretKey: '',
  bucket: '',
  bucketDomain: '',
  matchFiles: [],
  uploadPath: ''
}{{/if_in}}
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/api/*': commonProxy,
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8085, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: true,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true{{#if_in options "mandy"}},

    // deploy
    deploy: devDeploy{{/if_in}}
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report{{#if_in options "mandy"}},

    // deploy
    deploy: prodDeploy{{/if_in}}{{#if_in options "qiniu"}},

    // cdn deploy
    qiniuDeploy: qiniuDeploy{{/if_in}}
  }
}

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
{{#if_in options "mandy"}}
## Deloy Setup

> 请自行到 `mandy` 目录下，配置测试(`dev.js`)与生产(`prod.js`)环境部署信息

##### 配置字段

> 必需字段配置:  host, port, username, password, deployTo

- 测试 / 生产环境，deployTo(部署目录) 请到 `config/index.js` - `devDeploy.target`中配置
- 生产环境，password(密码) 请到 `config/index.js` - `prodDeploy.password`中配置

##### 部署命令
```bash
# 打包并且部署到指定测试服务器上
npm run deploy:dev

# 打包并且部署到指定生产服务器上
npm run deploy:prod

# 已打包，部署到指定测试服务器上
mandy deploy dev

# 已打包，部署到指定生产服务器上
mandy deploy prod
```{{/if_in}}
