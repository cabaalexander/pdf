const path = require('path');
const fs = require('fs');
const PDFMerge = require('pdf-merge');

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
});

const mergePdf = (dir, output) => {

  const chaptersFiles = fs
    .readdirSync(dir)
    .sort(collator.compare)
    .map(file => `${dir}/${file}`)
    .filter(f => /.pdf$/.test(f));

  const distBook = [dir]
    .map(x => x.replace(/(.*)\/.*$/, "$1"))
  [0];

  const bookName = path.basename(distBook);
  const outputBook = `${distBook}/${bookName}.pdf`;

  PDFMerge(chaptersFiles, {
    output: output || outputBook
  });

  console.log(`Merged: chapters from \`${dir}\` to \`${outputBook}\``);

}

// #########
// #       #
// # Begin #
// #       #
// #########

const [nodeBin, thisFile, ...dirs] = process.argv;

for (let dir of dirs) {
  try {

    mergePdf(dir)

  } catch (e) {

    console.error(e);

  }
}

