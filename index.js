const path = require('path')
const build = require('./lib/build')

const defaultConfig = {
  outputPath: path.resolve(process.cwd(), 'theme')
}

exports.run = config => {
  build(Object.assign(defaultConfig, config))
}
