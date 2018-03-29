const fs = require('fs');
const validateMessage = require('validate-commit-msg');

let message = fs.readFileSync(process.env.GIT_PARAMS, { encoding: 'utf8' });
let valid = validateMessage(message);

if (!valid) {
  console.log('\x1b[31m%s\x1b[0m', '\n[ERROR]:');
  console.log(
    '\nGit 规范文档: http://123.56.117.164:12590/root/docs/blob/master/Git%20%E4%BD%BF%E7%94%A8%E8%A7%84%E8%8C%83.md#%E4%BE%8B%E5%AD%90'
  );
  process.exit(1);
}
