const path = require('path');
const rootPath = path.resolve(__dirname, '..');

exports.dist = `${rootPath}/dist`;

exports.chapters = `${exports.dist}/chapters`;

exports.learnyouhaskellpdf = `${exports.dist}/learnyouhaskell.pdf`

