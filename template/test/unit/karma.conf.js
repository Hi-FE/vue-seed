// karma.conf.js

const webpackConfig = require('../../build/webpack.test.conf.js')
const path = require('path')

function getSpecs(specList) {
  if (specList.match(/(.spec.js)$/)) {
    return specList.split(',').map(function(url) {
      return path.join(__dirname, '../../', url)
    })
  }
  return ['**/*.spec.js'] // whatever your default glob is
}

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],

    files: getSpecs(process.argv[process.argv.length - 1]),

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['spec'],

    browsers: ['Chrome']
  })
}
