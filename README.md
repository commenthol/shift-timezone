# shift-timezone

> Shift local date to another timezone

[![NPM version](https://badge.fury.io/js/shift-timezone.svg)](https://www.npmjs.com/package/shift-timezone/)

> **⚠ WARNING**: The current implementation has a flaw when using at days where the local date changes to/from daylight saving times.

This package provides timezone conversion of local dates using the [IANA time-zones][] from browser/ OS.

Such there is no need to bundle the [IANA time-zones][] database which keeps this package small sized.
Timezone data is only that accurate as your browser/ OS is up-to-date with the latest time-zone updates.

Works in node and modern browsers.

> **ℹ NOTE**: Uses `Date.prototype.toLocaleString()` which is a slow function. The shimmed version is ~8x times faster...

For IE10, IE11 a shimmed version using [moment-timezone][] is available. You may use this as well if you like to have control of the timezone data and/or speed matters.

## Installation

```
npm i -S shift-timezone
```

## Usage

Convert a local date to date in different time-zone:

```js
const {timezone} = require('shift-timezone')
const localDate = new Date(2014, 5, 1, 12, 0, 0)
const shiftedDate = timezone(localDate, 'America/New_York')
console.log(shiftedDate.toISOString())
//> '2014-06-01T16:00:00.000Z'
```

Get time-zone offset to UTC in milliseconds:

```js
const {getTimezoneOffsetMs} = require('shift-timezone')
const localDate = new Date(2014, 5, 1, 12, 0, 0)
const offset = getTimezoneOffsetMs(localDate, 'America/New_York')
//> 14400000
```

## Browser Support

| Browser | Version | Notes                        |
| ------- | :-----: | ---------------------------- |
| Chrome  | >=45    | <font color="green">**✔**</font> |
| Firefox | >=45    | <font color="green">**✔**</font> |
| Safari  | >=10    | <font color="green">**✔**</font> Some timezones are not supported |
| Edge    | >=14    | <font color="green">**✔**</font> Some timezones are not supported <br> Do not use before 1992 |
| IE      | 10, 11  | <font color="red">**✕**</font> works if used with `require('shift-timezone/shim')`|

For IE10, IE11 (and also node) you can shim the lib at cost of bundle size:

```
npm i -S moment moment-timezone
```

```js
require('shift-timezone/shim') // this plugs in the shim
const {timezone} = require('shift-timezone')
...
```

## License

Unlicense <https://unlicense.org>

## References

- [IANA time-zones][]
- [moment-timezone][]

[IANA time-zones]: https://www.iana.org/time-zones
[moment-timezone]: http://momentjs.com/timezone/
