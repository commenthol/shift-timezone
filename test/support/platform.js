const platform = require('platform')

const name = platform.name === 'Node.js'
  ? 'node'
  : platform.name === 'IE'
    ? 'ie'
    : platform.name === 'Microsoft Edge'
      ? 'edge'
      : platform.name === 'Safari'
        ? 'safari'
        : ''

const major = (platform.version || '').split('.')[0]

module.exports = {
  name,
  major,
  version: name + major,
  isBrowser: (typeof window !== 'undefined'),
  isIE: name === 'ie',
  isEdge: name === 'edge',
  isSafari: name === 'safari'
}
