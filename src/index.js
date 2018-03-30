
const POS = {
  year: 2,
  month: 0,
  day: 1,
  hours: 3,
  minutes: 4,
  seconds: 5
}

const fns = {}

/**
 * parse date into array using `timeZone`
 * @private
 * @param {Date} date
 * @param {String} [timeZone=UTC] - a timezone string
 * @throws RangeError if `timeZone` is unknown
 */
const _parseToLocaleString = (date, timeZone = 'UTC') => {
  const dateStr = date.toLocaleString('en', { timeZone, hour12: false })
  const m = []
  dateStr.replace(/\d{1,4}/g, (n) => { m.push(n) })
  return m
}

/**
 * check parsed format and correct POS mappings if required
 */
;(function () {
  const map = {
    2001: 'year',
    5: 'month',
    6: 'day',
    14: 'hours',
    12: 'minutes',
    10: 'seconds'
  }
  const date = new Date(Date.UTC(2001, 4, 6, 14, 12, 10))
  _parseToLocaleString(date).forEach((v, i) => {
    const type = map[v]
    // istanbul ignore next
    if (!type) throw new Error('Date.toLocaleString does not work with timeZone')
    POS[type] = i
  })
}())

/**
* convert parsed localized data to Date
* @private
*/
const _date = (date, timeZone) => {
  const m = _parseToLocaleString(date, timeZone)
  return new Date(m[POS.year], m[POS.month] - 1, m[POS.day], m[POS.hours], m[POS.minutes], m[POS.seconds])
}

/**
 * convert to UTC
 * @private
 * @param {Date} date
 */
const toUTC = (date) => {
  const utc = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  )
  utc._isUTC = 1
  return utc
}

/**
 * get timezone offset from UTC for a given local date in `timeZone`
 * @param {Date} date
 * @param {String} [timeZone=UTC] - a timezone string
 */
fns.getTimezoneOffsetMs = (date, timeZone) => {
  if (!date._isUTC) date = toUTC(date)
  return _date(date, 'UTC') - _date(date, timeZone)
}

/**
 * get timezone offset from UTC for a given local date in `timeZone`
 * @param {Date} date
 * @param {String} [timeZone=UTC] - a timezone string
 */
fns.timezone = (date, timeZone) => {
  const utc = toUTC(date)
  const diff = getTimezoneOffsetMs(utc, timeZone)
  const d = new Date(+utc + diff)
  // console.log('>>> %s\n    %s\n    %s', date.toString(), utc.toString(), d.toString())
  return d
}

const timezone = (date, timezone) => fns.timezone(date, timezone)
const getTimezoneOffsetMs = (date, timezone) => fns.getTimezoneOffsetMs(date, timezone)

/**
 * shim to inject moment-timezone for IE11
 * @private
 * @param {Object} fns
 */
const _shim = (_fns) => {
  Object.assign(fns, _fns)
}

module.exports = {
  timezone,
  getTimezoneOffsetMs,
  _shim
}
