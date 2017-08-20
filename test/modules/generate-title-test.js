'use strict'

const tap = require('tap')
const generateTitle = require('../../index')
const data = require('../data/ikke-samtale.json')
const expectedOffTitle = 'Elevsamtale - ikke ønsket - 20.08.2017 - BAMVS:3ST'
const expectedUntOfTitle = 'Elevsamtale - ikke ønsket - Thomas Topstad - 20.08.2017 - BAMVS:3ST'

tap.equal(generateTitle(data), expectedOffTitle, 'It returns expected public title')
tap.equal(generateTitle(data, true), expectedUntOfTitle, 'It returns expected private title')
