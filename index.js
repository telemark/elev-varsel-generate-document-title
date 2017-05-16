'use strict'

const capitalize = require('capitalize')
const getSkoleAar = require('get-skole-aar')
const fixPeriod = require('./lib/fix-period')
const datePadding = require('./lib/date-padding')

function resolveCategory (item) {
  let resolved = item.documentCategory

  if (item.documentCategory === 'samtale') {
    resolved = item.documentTemplate === 'ikke-samtale' ? 'ikke ønsket' : 'gjennomført'
  }

  return resolved
}

module.exports = (item, untOff) => {
  const now = new Date()
  const date = datePadding(now.getDate()) + '.' + datePadding(now.getMonth() + 1) + '.' + now.getFullYear()
  let title = []

  title.push(capitalize(item.documentType === 'samtale' ? 'Elevsamtale' : item.documentType))
  title.push(resolveCategory(item))
  if (untOff) {
    title.push(item.studentName)
  }
  if (item.documentType === 'samtale') {
    title.push(item.documentDate || date)
  }
  title.push(item.studentMainGroupName)
  if (item.documentType !== 'samtale') {
    title.push(fixPeriod(item.period))
    title.push(getSkoleAar())
  }
  let result = title.join(' - ')
  const charsLeft = 128 - result.length

  if (item.documentCategory === 'fag') {
    const coursesList = item.coursesList.split('\n')
    const coursesJoined = coursesList
                            .map(course => course.split(' ')[0])
                            .map(course => course.split(':')[1])
                            .reduce((a, b) => `${a} - ${b}`)

    if (coursesJoined.length + 4 <= charsLeft) {
      result = result.replace('fag', `fag - ${coursesJoined}`)
    } else if (coursesList.length > 1 && charsLeft >= 6) {
      result = result.replace('fag', 'flere fag')
    }
  }

  return result
}
