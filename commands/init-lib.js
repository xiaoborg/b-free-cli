const { prompt } = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const fs = require('fs')

// const option = program.parse(process.argv).args[]
const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name',
    //  default: typeof option === 'string' ? option : 'al-block-template',
    default: 'demo001',
    filter(val) {
      return val.trim()
    },
    validate(val) {
      const validate = val.trim().split(' ').length === 1
      return validate || 'Project name is not allowed to have spaces '
    },
    transformer(val) {
      return val
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: '',
    validate() {
      return true
    },
    transformer(val) {
      return val
    }
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author',
    default: '',
    validate() {
      return true
    },
    transformer(val) {
      return val
    }
  }
]

const templatesConfig = require('../templates')

module.exports = {
  promptFunc: function (_options) {
    question[0].default = _options.projectName
    question[1].default = _options.description

    prompt(question).then(({ name, description, author }) => {
      // Get the corresponding gitup path
      const _gitPlace = templatesConfig[_options.type].path
      description = description
        ? description
        : templatesConfig[_options.type].description
      const _projectName = name
      const _spinner = ora('Downloading please wait...')

      _spinner.start()
      // start download gitup project
      download(`${_gitPlace}`, `./${_projectName}`, err => {
        if (err) {
          console.log(chalk.red(err))
          process.exit()
        }

        fs.readFile(
          `./${_projectName}/package.json`,
          'utf8',
          function (err, data) {
            if (err) {
              _spinner.stop()
              console.error(err)
              return
            }

            const packageJson = JSON.parse(data)
            packageJson.name = name
            packageJson.description = description
            packageJson.author = author

            fs.writeFile(
              `./${_projectName}/package.json`,
              JSON.stringify(packageJson, null, 2),
              'utf8',
              function (err) {
                if (err) {
                  _spinner.stop()
                  console.error(err)
                } else {
                  _spinner.stop()
                  console.log(chalk.green('project init successfully!'))
                  console.log(`
                ${chalk.yellow(`cd ${name}`)}
                ${chalk.yellow('npm install')}
                ${chalk.yellow('npm run dev')}
              `)
                }
              }
            )
          }
        )
      })
    })
  }
}
