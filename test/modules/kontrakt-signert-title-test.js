const tap = require('tap')
const generateTitle = require('../../index')
const datePadding = require('../../lib/date-padding')
const data = require('../data/kontrakt-signert.json')
const now = data.documentDate ? new Date(data.documentDate) : new Date()
const date = formatDate(now)
const expectedOffTitle = `Informasjonsbrev - godkjent lærekontrakt - ${date}`
const expectedUntOfTitle = `Informasjonsbrev - godkjent lærekontrakt - ${date}`

function formatDate (date) {
  return `${datePadding(date.getDate())}.${datePadding(date.getMonth() + 1)}.${date.getFullYear()}`
}

tap.equal(generateTitle(data), expectedOffTitle, 'It returns expected public title')
tap.equal(generateTitle(data, true), expectedUntOfTitle, 'It returns expected private title')
