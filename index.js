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

function formatDate (date) {
  return `${datePadding(date.getDate())}.${datePadding(date.getMonth() + 1)}.${date.getFullYear()}`
}

module.exports = (item, untOff) => {
  const now = item.documentDate ? new Date(item.documentDate) : new Date()
  const date = formatDate(now)
  let title = []

  if (/yff/.test(item.documentCategory) === true) {
    if (item.documentCategory === 'yff-bekreftelse') {
      title.push('Bekreftelse til elev')
    } else if (item.documentCategory === 'yff-bekreftelse-bedrift') {
      title.push('Bekreftelse til bedrift')
    } else if (item.documentCategory === 'yff-lokalplan') {
      title.push('Elevens lokale læreplan')
    } else if (item.documentCategory === 'yff-tilbakemelding') {
      title.push('Tilbakemeldingsskjema - arbeidspraksis')
    }
    title.push('yrkesfaglig fordypning')
    title.push('YFF')
    if (untOff) {
      title.push(item.studentName)
      if (item.documentCategory !== 'yff-bekreftelse-bedrift') {
        title.push(item.schoolName)
      }
      title.push(getSkoleAar())
      if (['yff-bekreftelse', 'yff-tilbakemelding'].includes(item.documentCategory)) {
        title.push(item.bedriftsNavn)
      }
    }
  } else if (item.documentCategory === 'kontrakt-signert') {
    title.push('Informasjonsbrev')
    title.push('godkjent lærekontrakt')
    title.push(date)
  } else {
    title.push(capitalize(item.documentType === 'samtale' ? 'Elevsamtale' : item.documentType))

    title.push(resolveCategory(item))

    if (untOff) {
      title.push(item.studentName)
    }
    if (item.documentType === 'samtale') {
      title.push(date)
    }
    title.push(item.studentMainGroupName)
    if (item.documentType !== 'samtale') {
      if (item.period) title.push(fixPeriod(item.period))
      title.push(getSkoleAar())
    }
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
