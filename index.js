const pdf = require('./src/pdf.js');
const chaptersUrl = require('./config/chapters-url.js');

(async () => {

  for (let idx in chaptersUrl) {
    await pdf({
      url: chaptersUrl[idx],
      pdfPrefix: `${+idx + 1}.`,
    })
  }

})()

