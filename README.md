# shift-timezone

> Shift local date to another timezone

[![NPM version](https://badge.fury.io/js/shift-timezone.svg)](https://www.npmjs.com/package/shift-timezone/)

This package provides timezone conversion of local dates using the [IANA time-zones][] from browser/ OS.

Such there is no need to bundle the [IANA time-zones][] database which keeps this package small sized.
Timezone data is only that accurate as your browser/ OS is up-to-date with the latest time-zone updates.

If you need control of the timezone data, consider using [moment-timezone][] or [timezone-js][].

Works in node and modern browsers.

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
| Safari  | >=10    | <font color="green">**✔**</font> |
| Edge    | >=14    | <font color="green">**✔**</font> (some timezones not supported) |
| IE      | 10, 11  | <font color="red">**✕**</font> |

## License

Unlicense <https://unlicense.org>

## References

- [IANA time-zones][]
- [moment-timezone][]
- [timezone-js][]

[IANA time-zones]: https://www.iana.org/time-zones
[moment-timezone]: http://momentjs.com/timezone/
[timezone-js]: https://www.npmjs.com/package/timezone-js