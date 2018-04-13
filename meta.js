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
    template_version() {
      return templateVersion
    }
  },
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Author',
      default: 'hife',
    },
    env: {
      when: 'isNotTest',
      type: 'list',
      message: 'Pick an runtime environment',
      choices: [
        {
          name: 'pc',
          value: 'pc',
          short: 'pc',
        },
        {
          name: 'h5',
          value: 'h5',
          short: 'h5',
        }
      ],
    },
    commit_check: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Check git commit message with hife specifications ?',
      default: true
    },
    options: {
      when: 'isNotTest',
      type: 'checkbox',
      message: 'Some optional config, All selected by default',
      choices: [
        {
          name: 'sentry',
          value: 'sentry',
          short: 'Sentry',
          checked: true
        },
        {
          name: 'growingio',
          value: 'growingio',
          short: 'Growingio',
          checked: true
        },
        {
          name: 'mandy',
          value: 'mandy',
          short: 'Mandy',
          checked: true
        },
        {
          name: 'qiniu',
          value: 'qiniu',
          short: 'Qiniu CDN',
          checked: true
        },

      ]
    }
  },
  filters: {
    'scripts/**/*': 'commit_check',
    'mandy/**/*': 'options.mandy',
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
