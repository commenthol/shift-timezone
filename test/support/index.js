const { zones } = require('moment-timezone/data/meta/latest.json')
const platform = require('./platform')

/**
 * parse str to local date
 * @param {String} str - e.g. '2018-03-01 12:00:00`
 */
const localeDate = (str) => {
  let m = []
  str.replace(/\d+/g, n => m.push(parseInt(n)))
  m[1]--
  return new Date(...m)
}

/**
 * unsupported timezones per node version
 */
let unsupported = {
  node4: [
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
  node6: [
    'America/Punta_Arenas',
    'Antarctica/DumontDUrville'
  ],
  node8: [
    'Antarctica/DumontDUrville'
  ],
  safari10: [
    'America/Punta_Arenas',
    'Asia/Atyrau',
    'Asia/Famagusta',
    'Asia/Yangon',
    'Europe/Saratov'
  ]
}

unsupported.node9 = unsupported.node8
unsupported.safari11 = unsupported.safari10

if (process.env.TEST_SHIM) {
  unsupported = {}
}

const filteredZones = Object.keys(zones)
  .sort()
  .filter(zone => {
    // filter out unsupported zones
    return !(unsupported[platform.version] && ~unsupported[platform.version].indexOf(zone))
  })

module.exports = {
  localeDate,
  filteredZones,
  platform
}
