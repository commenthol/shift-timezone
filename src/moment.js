const moment = require('moment-timezone')

const pad0 = (number, len = 2) => {
  number = Array(len).join('0') + number.toString()
  return number.substr(number.length - len, len)
}

const toString = (date) =>
  pad0(date.getFullYear(), 4) + '-' +
  pad0(date.getMonth() + 1) + '-' +
  pad0(date.getDate()) +
  ' ' +
  pad0(date.getHours()) + ':' +
  pad0(date.getMinutes()) + ':' +
  pad0(date.getSeconds())

const timezone = (date, timeZone) => new Date(moment.tz(toString(date), timeZone).format())

const getTimezoneOffsetMs = (date, timeZone) => timezone(date, timeZone) - timezone(date, 'UTC')

module.exports = {
  timezone,
  getTimezoneOffsetMs,
  toString
}
