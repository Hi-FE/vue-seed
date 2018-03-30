var config = require('../config/index.js')
var deploy = config.dev.devDeploy

module.exports = {
  ssh: {
    host: 'test.hitour.cc',
    port: 11701,
    username: 'app',
    password: 'UR5gD$J2Tjz'
    // privateKey: '/Users/zzetao/.ssh/id_rsa'
    // 更多配置：https://github.com/mscdex/ssh2#client-methods
  },
  keepReleases: 10,     // 保存历史版本数量
  workspace: deploy.origin,   // {相对路径}  待发布文件目录
  deployTo: deploy.target  // {绝对路径}  线上部署目录
}
