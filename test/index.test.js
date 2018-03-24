const assert = require('assert')
const { timezone } = require('../src')
const moment = require('moment-timezone')
const { zones } = require('moment-timezone/data/meta/latest.json')

let version = 0
if (typeof process !== 'undefined' && process.versions.node) {
  version = process.versions.node.split(/\./)[0]
}
const unsupported = {
  0: [],
  4: [
    'America/Fort_Nelson',
    'America/Punta_Arenas',
    'Antarctica/DumontDUrville',
    'Asia/Atyrau',
    'Asia/Barnaul',
    'Asia/Famagusta',
    'Asia/Tomsk',
    'Asia/Yangon',
    'Europe/Astrakhan',
    'Europe/Kirov',
    'Europe/Saratov',
    'Europe/Ulyanovsk'
  ],
  6: [
    'America/Punta_Arenas',
    'Antarctica/DumontDUrville'
  ],
  8: [
    'Antarctica/DumontDUrville'
  ],
  9: [
    'Antarctica/DumontDUrville'
  ]
}

describe('timezone', function () {
  const localeDate = (str) => {
    let m = []
    str.replace(/\d+/g, n => m.push(parseInt(n)))
    m[1]--
    return new Date(...m)
  }

  context('should convert local date', function () {
    it('into timezone "America/New_York"', function () {
      const d = timezone(localeDate('2014-06-01 12:00:00'), 'America/New_York')
      assert.equal(d.toISOString(), '2014-06-01T16:00:00.000Z')
    })

    it('into timezone "America/Los_Angeles"', function () {
      const d = timezone(localeDate('2014-06-01 09:00:00'), 'America/Los_Angeles')
      assert.equal(d.toISOString(), '2014-06-01T16:00:00.000Z')
    })

    it('into timezone "Europe/London"', function () {
      const d = timezone(localeDate('2014-06-01 17:00:00'), 'Europe/London')
      assert.equal(d.toISOString(), '2014-06-01T16:00:00.000Z')
    })
  })

  context('zones', function () {
    // compare with moment-timezone data
    const tz = (date, timezone) => new Date(moment.tz(date, timezone).format())

    const _zones = Object.keys(zones)
      .sort()
      .filter(zone => {
        // filter out unsupported zones
        return !~unsupported[version].indexOf(zone)
      })

    context('december', function () {
      const dec = '2014-12-01 12:00:00'
      _zones.forEach(zone => {
        it(zone, function () {
          const res = timezone(localeDate(dec), zone)
          const exp = tz(dec, zone)
          assert.equal(res.toISOString(), exp.toISOString())
        })
      })
    })

    context('december', function () {
      const jun = '2014-06-01 12:00:00'
      _zones.forEach(zone => {
        it(zone, function () {
          const res = timezone(localeDate(jun), zone)
          const exp = tz(jun, zone)
          assert.equal(res.toISOString(), exp.toISOString())
        })
      })
    })
  })
})
