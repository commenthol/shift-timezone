/* eslint no-console: 0 */

const { timezone } = require('../src')
const { localeDate } = require('./support')

const specialDescribe = process.env.BENCHMARK
  ? describe
  : function () {}

specialDescribe('benchmark', function () {
  ;[false, true].forEach((shim) => {
    it('run... ' + (shim ? 'shimmed' : ''), function () {
      if (shim) require('../src/shim')
      let d = localeDate('2014-06-01 12:00:00')
      const res = Array(5)
      console.time('bench')
      for (let i = 0; i < 1000; i++) {
        res[i % 5] = timezone(new Date(+d + i * 360000), 'America/New_York')
        // console.log(res[i % 5])
      }
      console.timeEnd('bench')
    })
  })
})
