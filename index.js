const pdf = require('./src/pdf.js');
const getUrls = require('./src/get-urls.js');

const chapterSelector = '.summary > li.chapter > a';


(async () => {

  const urls = await getUrls({
    url: 'https://mostly-adequate.gitbooks.io/mostly-adequate-guide/',
    selector: chapterSelector,
  });

  for (let idx in chaptersUrl) {
    await pdf({
      url: chaptersUrl[idx],
      pdfPrefix: `${+idx + 1}.`,
    })
  }

})()

