var config = require('../config/index.js')
var deploy = config.build.deploy
var utils = require('./utils.js')

var defaultConfig = {
  ssh: {
    host: '',
    port: '',
    username: '',
    // 更多配置：https://github.com/mscdex/ssh2#client-methods
  },
  keepReleases: 10, // 保存历史版本数量
  workspace: 'dist',   // {相对路径}  待发布文件目录
}

module.exports = utils.mergeConfig(defaultConfig, {
  deployTo: deploy.target,
  ssh: {
    password: deploy.password
  }
})
