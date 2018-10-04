const fs = require('fs');
const PDFMerge = require('pdf-merge');

const { learnyouhaskellpdf, chapters } = require('../config/constants.js');

const collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

const chaptersFiles = fs
  .readdirSync(chapters)
  .sort(collator.compare)
  .map(file => `${chapters}/${file}`);

PDFMerge(chaptersFiles, {output: learnyouhaskellpdf});

// console.log(`Files from (${chapters})\nMerged into (${learnyouhaskellpdf})`);
console.log(`Files merged\n\n\t${chapters}/*\n\t\tto\n\t${learnyouhaskellpdf}`);

