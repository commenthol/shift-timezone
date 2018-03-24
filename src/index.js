
const POS = {
  year: 2,
  month: 0,
  day: 1,
  hours: 3,
  minutes: 4,
  seconds: 5
}

/**
 * parse date into array using `timeZone`
 * @private
 * @param {Date} date
 * @param {String} [timeZone=UTC] - a timezone string
 * @throws RangeError if `timeZone` is unknown
 */
const _parse = (date, timeZone = 'UTC') => {
  const dateStr = date.toLocaleString('en', { timeZone, hour12: false })
  const m = []
  dateStr.replace(/\d+/g, (n) => { m.push(parseInt(n, 10)) })
  return m
}

/*
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
  _parse(date).forEach((v, i) => {
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
  const m = _parse(date, timeZone)
  return new Date(m[POS.year], m[POS.month] - 1, m[POS.day], m[POS.hours], m[POS.minutes], m[POS.seconds])
}

/**
 * get timezone offset from UTC for a given local date in `timeZone`
 * @param {Date} date
 * @param {String} [timeZone=UTC] - a timezone string
 */
const getTimezoneOffsetMs = (date, timeZone) => _date(date, 'UTC') - _date(date, timeZone)

/**
 * get timezone offset from UTC for a given local date in `timeZone`
 * @param {Date} date
 * @param {String} [timeZone=UTC] - a timezone string
 */
const timezone = (date, timeZone) => {
  const diff = getTimezoneOffsetMs(date, timeZone)
  const d = new Date(
    Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()
    ) + diff
  )
  return d
}

module.exports = {
  getTimezoneOffsetMs,
  timezone
}
