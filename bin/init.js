#!/usr/bin/env node

process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

const Commands = require('../commands/init-lib')

// 获取项目的版本号
program.version(require('../package').version)

program.usage('<command>')

program
  .version('', '-v, --version')
  .command('init <name>')
  .description('create a new project')
  .alias('i')
  .requiredOption('-t, --type <name>', 'project type [lib, vue]')
  .action((name, options) => {
    if (options.t) options.type = options.t
    if (options.type) options.t = options.type
    const _options = { ...options }
    _options.projectName = name
    console.log(_options)
    Commands.promptFunc(_options)
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
