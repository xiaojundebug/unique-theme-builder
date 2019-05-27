const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const path = require('path')
const ora = require('ora')
const fs = require('fs')
const chalk = require('chalk')

const inputPath = path.resolve(process.cwd(), 'node_modules/unique-ui/packages/theme/src')
let outputPath = null

function compile() {
  return src(inputPath + '/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(dest(outputPath))
}

function copyfont() {
  return src(inputPath + '/fonts/**')
    .pipe(cssmin())
    .pipe(dest(outputPath + '/fonts'))
}

module.exports = config => {
  outputPath = config.outputPath

  const spinner = ora('building...').start()

  const exist = fs.existsSync(path.resolve(process.cwd(), 'node_modules/unique-ui'))
  if (!exist) {
    spinner.text = chalk.cyan('unique-ui') + ' was not found in the path ' + chalk.redBright(path.resolve(process.cwd(), 'node_modules'))
    spinner.fail()
    process.exit()
  }

  series(compile, copyfont, function(e) {
    spinner.text = 'build succeed'
    spinner.succeed()
  })()
}
