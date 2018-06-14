[![Build Status](https://travis-ci.org/telemark/elev-varsel-generate-document-title.svg?branch=master)](https://travis-ci.org/telemark/elev-varsel-generate-document-title)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# elev-varsel-generate-document-title

Generates document title for elev varsel

## Usage

Input document object and untOff (boolean).

untOff = true => Includes students name

```JavaScript
const data = require('./document.json')
const generateTitle = require('./index')

console.log(generateTitle(data, true))

//=> Varsel - fag - 3GKJ/876ABC2003 - Tomato Sauce - LARVS:3GKJ - Standpunktkarakter - 2016/2017

console.log(generateTitle(data, false))

//=> Varsel - fag - 3GKJ/876ABC2003 - LARVS:3GKJ - Standpunktkarakter - 2016/2017

```

## License

[MIT](LICENSE)

![Robohash image of elev-varsel-generate-document-title](https://robots.kebabstudios.party/elev-varsel-generate-document-title.png "Robohash image of elev-varsel-generate-document-title")