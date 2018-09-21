const path = require('path')
const fs = require('fs')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

const { addTestAnswers } = require('./scenarios')

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    if_in(v1, v2, options) {
      if ((v1 || {})[v2]) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    if_in_or(v1, ...args) {
      const options = args[args.length - 1]

      if (args.some(item => !!(v1 || {})[item])) return options.fn(this)

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    }
  },
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: '项目名称',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: '项目描述',
      default: 'A wantu project',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: '作者',
    },
    env: {
      when: 'isNotTest',
      type: 'list',
      message: '选择网站类型',
      choices: [
        {
          name: 'PC端',
          value: 'pc',
          short: 'pc',
        },
        {
          name: '移动端',
          value: 'h5',
          short: 'h5',
        }
      ],
    },
    vconsole: {
      when: 'isNotTest && env === "h5"',
      type: 'confirm',
      message: '使用 vConsole 调试移动端 ?',
      default: true
    },
    commit_check: {
      when: 'isNotTest',
      type: 'confirm',
      message: '是否启用 git commit 规范检查 ?',
      default: true
    },
    unit_test: {
      when: 'isNotTest',
      type: 'confirm',
      message: '使用 Karma + Mocha 单元测试 ?',
      default: true
    },
    typescript: {
      when: 'isNotTest',
      type: 'confirm',
      message: '使用 TypeScript (Beta) ?',
      default: false
    },
    options: {
      when: 'isNotTest',
      type: 'checkbox',
      message: '可选配置',
      choices: [
        {
          name: 'Sentry (错误采集)',
          value: 'sentry',
          short: 'Sentry',
          checked: true
        },
        {
          name: 'Growingio (统计)',
          value: 'growingio',
          short: 'Growingio',
          checked: true
        },
        {
          name: 'Mandy (静态部署工具)',
          value: 'mandy',
          short: 'Mandy',
          checked: true
        },
        {
          name: 'Qiniu (静态资源 CDN 上传)',
          value: 'qiniu',
          short: 'Qiniu',
          checked: false
        },
        {
          name: 'I18n (多语言配置)',
          value: 'i18n',
          short: 'I18n',
          checked: false
        },
      ]
    }
  },
  filters: {
    'test/unit/**/*': 'unit_test',
    'scripts/**/*': 'commit_check',
    'mandy/**/*': 'options.mandy',
    'src/_i18n/**/*': 'options.i18n',
    'src/_utils/sentry.*': 'options.sentry',
    'src/_utils/growingio.*': 'options.growingio',
    'src/**/*.js': '!typescript',
    'src/**/*.ts': 'typescript',
    'tsconfig.json': 'typescript'
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
