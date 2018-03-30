const { _shim } = require('./index')
const { timezone, getTimezoneOffsetMs } = require('./moment')

_shim({ timezone, getTimezoneOffsetMs })
