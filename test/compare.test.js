/* eslint no-unused-vars: 0 */

const assert = require('assert')
const { platform } = require('./support')
const { timezone } = require('../src')
const shimmed = require('../src/moment')
// const dateTz = require('./support/dateTz')

// Use only a selected set of zones
const filteredZones = ['Africa/Monrovia', 'America/Adak', 'Pacific/Honolulu', 'Pacific/Auckland', 'Asia/Tehran']
// const { filteredZones } = require('./support')

describe('compare', function () {
  this.timeout(Infinity)
  const years = []
  for (let year = platform.isEdge ? 1992 : 1950; year < 2038; year++) { // moment-timezone is different after 2038. Why?
    years.push(year)
  }
  years.forEach((year) => {
    it('should compare dates ' + year, function () {
      const bad = []
      filteredZones.forEach(zone => {
        for (let month = 9; month < 11; month++) {
          for (let day = 1; day <= 1; day++) {
            const date = new Date(year, month, day, 12, 0, 0)

            let secOffset = 0
            if (
              !platform.isIE && !process.env.TEST_SHIM &&
              zone === 'Africa/Monrovia' && date < new Date(1972, 0, 7, 0, 0, 0)
            ) {
              secOffset = 30 * 1000 // POSIX TZ format does not support seconds
            }

            const res = timezone(date, zone)
            const exp = new Date(secOffset + shimmed.timezone(date, zone).getTime())
            // const dtz = dateTz(date, zone)
            if (
              res.toISOString() !== exp.toISOString()
            ) {
              bad.push({ zone, date, res, exp })
              // console.log({ zone, date, res, exp, local: date.toString() })
            }
          }
        }
      })
      assert.deepEqual(bad, [])
    })
  })
})
