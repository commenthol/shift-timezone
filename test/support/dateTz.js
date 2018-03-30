/**
 * tz conversion using *nix date - is very slow...
 */
const { toString } = require('../../src/moment')
const { spawnSync } = require('child_process')

function date (date, timeZone) {
  let utcDate
  const str = toString(date)
  const args = ['-Is', '--date', `TZ="${timeZone}" ${str}`]
  const res = spawnSync('date', args)
  if (res.stdout) {
    const str = res.stdout.toString().replace(/\n/g, '')
    utcDate = new Date(str)
  } else {
    utcDate = new Date(NaN)
  }
  return utcDate
}

module.exports = date
