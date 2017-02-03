'use strict'

const capitalize = require('capitalize')
const getSkoleAar = require('get-skole-aar')
const fixPeriod = require('./lib/fix-period')

module.exports = (item, untOff) => {
  let title = []

  title.push(capitalize(item.documentType))
  title.push(item.documentCategory)
  if (untOff) {
    title.push(item.studentName)
  }
  title.push(item.studentMainGroupName)
  title.push(item.schoolName)
  title.push(fixPeriod(item.period))
  title.push(getSkoleAar())

  let result = title.join(' - ')
  const charsLeft = 128 - result.length

  if (item.documentCategory === 'fag') {
    const coursesList = item.coursesList.split('\n')
    const courses = coursesList
                      .map(course => course.split(' ')[0])
                      .map(course => course.split(':')[1])
    const coursesJoined = courses.join(' - ')

    if (coursesJoined.length + 4 <= charsLeft) {
      result = result.replace('fag', `fag - ${coursesJoined}`)
    } else if (coursesList.length > 1 && charsLeft >= 6) {
      result = result.replace('fag', 'flere fag')
    }
  }

  return result
}
