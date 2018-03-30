var config = require('../config/index.js')
var deploy = config.build.prodDeploy

module.exports = {
  ssh: {
    host: 'hitour.cc',
    port: 11701,
    username: 'app',
    password: deploy.password
    // privateKey: '/Users/zzetao/.ssh/id_rsa'
    // 更多配置：https://github.com/mscdex/ssh2#client-methods
  },
  keepReleases: 10,     // 保存历史版本数量
  workspace: deploy.origin,   // {相对路径}  待发布文件目录
  deployTo: deploy.target  // {绝对路径}  线上部署目录
}
