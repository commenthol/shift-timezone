const assert = require('assert')
const { timezone, getTimezoneOffsetMs } = require('../src')
const { localeDate, filteredZones, platform } = require('./support')
const shimmed = require('../src/moment')

if (platform.isIE) {
  // For IE11 tests
  require('core-js/fn/object/assign')
}
if (process.env.TEST_SHIM || platform.isIE) {
  require('../src/shim')
}

describe('timezone', function () {
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

    it('into timezone "America/Adak"', function () {
      const d = timezone(localeDate('1990-04-01 12:00:00'), 'America/Adak')
      assert.equal(d.toISOString(), '1990-04-01T21:00:00.000Z')
    })

    // use `TZ=Europe/Amsterdam`
    // test fails as Amsterdam changes to CEST but New York - UTC diff is +0400 instead of +0500
    // problem is within ['1990-03-25 02:00:00' ... '1990-03-25 07:59:59']
    it.skip('fails - "Europe/Amsterdam" into timezone "America/New_York" while changing to CEST at 04:00', function () {
      const d = timezone(localeDate('1990-03-25 04:00:00'), 'America/New_York')
      // assert.equal(d.toISOString(), '1990-03-25T08:00:00.000Z') // this is what we get +0400
      assert.equal(d.toISOString(), '1990-03-25T09:00:00.000Z') // this is what ist should be +0500
    })
    // use `TZ=Europe/Amsterdam`
    it('"Europe/Amsterdam" into timezone "America/New_York" while changing to CEST at 08:00', function () {
      const d = timezone(localeDate('1990-03-25 08:00:00'), 'America/New_York')
      assert.equal(d.toISOString(), '1990-03-25T13:00:00.000Z')
    })
    it.skip('fails - "Europe/Amsterdam" into timezone "Australia/Adelaide" while changing to CET at 00:00', function () {
      const date = localeDate('1990-10-28 00:00:00')
      const d = timezone(date, 'Australia/Adelaide')
      // '1990-10-27T13:30:00.000Z' - this is what we get
      assert.equal(d.toISOString(), '1990-10-27T14:30:00.000Z')
    })
  })

  context('zones', function () {
    context('december', function () {
      const dec = localeDate('2014-12-01 12:00:00')
      filteredZones.forEach(zone => {
        it(zone, function () {
          const res = timezone(dec, zone)
          const exp = shimmed.timezone(dec, zone)
          assert.equal(res.toISOString(), exp.toISOString())
        })
      })
    })

    context('december', function () {
      const jun = localeDate('2014-06-01 12:00:00')
      filteredZones.forEach(zone => {
        it(zone, function () {
          const res = timezone(jun, zone)
          const exp = shimmed.timezone(jun, zone)
          assert.equal(res.toISOString(), exp.toISOString())
        })
      })
    })
  })
})

describe('getTimezoneOffsetMs', function () {
  const HOURS = 3600 * 1000
  context('should get offset to UTC in ms', function () {
    it('for timezone "America/New_York"', function () {
      const ms = getTimezoneOffsetMs(localeDate('2014-06-01 12:00:00'), 'America/New_York')
      assert.strictEqual(ms / HOURS, 4)
    })

    it('for timezone "America/Los_Angeles"', function () {
      const ms = getTimezoneOffsetMs(localeDate('2014-06-01 09:00:00'), 'America/Los_Angeles')
      assert.strictEqual(ms / HOURS, 7)
    })

    it('for timezone "Europe/London"', function () {
      const ms = getTimezoneOffsetMs(localeDate('2014-06-01 17:00:00'), 'Europe/London')
      assert.strictEqual(ms / HOURS, -1)
    })

    it('for timezone "America/Adak"', function () {
      const ms = getTimezoneOffsetMs(localeDate('1990-03-31 12:00:00'), 'America/Adak')
      assert.strictEqual(ms / HOURS, 10)
    })

    it('for timezone "America/Adak" DST', function () {
      const ms = getTimezoneOffsetMs(localeDate('1990-04-01 12:00:00'), 'America/Adak')
      assert.strictEqual(ms / HOURS, 9)
    })

    // 'fails in TZ=Europe/Amsterdam -
    it.skip('fails - for timezone "America/New_York" in "Europe/Amsterdam"', function () {
      const ms = getTimezoneOffsetMs(localeDate('1990-03-25 04:00:00'), 'America/Adak')
      assert.strictEqual(ms / HOURS, 5) // is currently 4h
    })
  })
})
