const pluginTester = require('babel-plugin-tester').default
const plugin = require('babel-plugin-macros')
const path = require('path')
const glob = require('glob-all')
const fs = require('fs')

const configFile = file => `${path.dirname(file)}/config.json`

pluginTester({
  plugin,
  pluginName: 'twin.macro',
  babelOptions: {
    filename: __filename,
    babelrc: true,
  },
  snapshot: true,
  tests: glob
    .sync(['__fixtures__/**/*.js', '!__fixtures__/**/*.config.js'])
    .map(file => ({
      title: path.basename(file),
      code: fs.readFileSync(file, 'utf-8'),
      ...(fs.existsSync(configFile(file)) && {
        pluginOptions: {
          twin: JSON.parse(fs.readFileSync(configFile(file), 'utf-8')),
        },
      }),
    })),
})
