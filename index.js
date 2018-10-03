const pdf = require('./pdf.js');
const chaptersUrl = require('./chapters-url.js');

(async () => {

  for (let idx in chaptersUrl) {
    await pdf({
      url: chaptersUrl[idx],
      pdfPrefix: `${+idx + 1}.`,
    })
  }

})()

