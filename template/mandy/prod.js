var config = require('../config/index.js')
var deploy = config.build.deploy

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

function mergeConfig (config1, config2) {
  var result = {}
  for (var key in Object.assign({}, config1, config2)) result[key] = config2[key] || config1[key]
  return result
}

module.exports = mergeConfig(defaultConfig, {
  deployTo: deploy.target,
  password: deploy.password
})
