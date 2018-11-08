const pdf = require('./src/pdf.js');
const getUrls = require('./src/get-urls.js');

const chapterSelector = '.summary > li.chapter > a';


(async () => {

  let urls = await getUrls({
    url: 'https://mostly-adequate.gitbooks.io/mostly-adequate-guide/',
    selector: chapterSelector,
  });

  const [first, second, ...others] = urls;

  urls = [first, second]

  for (let idx in urls) {
    await pdf({
      url: urls[idx],
      title: s => s.slice(0, s.indexOf('·') - 1),
      pdfPrefix: `${+idx + 1}.`,
      eval: () => {
        document
          .querySelectorAll('.footdiv')
          .forEach((element) => element.parentNode.removeChild(element));
      }
    })
  }

})()

