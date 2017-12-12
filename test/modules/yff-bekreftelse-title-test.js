const tap = require('tap')
const getSkoleAar = require('get-skole-aar')
const generateTitle = require('../../index')
const data = require('../data/yff-bekreftelse.json')
const expectedOffTitle = 'YFF - Bekreftelse om avtale yrkesfaglig fordypning'
const expectedUntOfTitle = `YFF - Bekreftelse om avtale yrkesfaglig fordypning - Thomas Topstad - Bamble vgs. avd. Grasmyr - ${getSkoleAar()} - CAFE GO' GRISEN AS`

tap.equal(generateTitle(data), expectedOffTitle, 'It returns expected public title')
tap.equal(generateTitle(data, true), expectedUntOfTitle, 'It returns expected private title')
