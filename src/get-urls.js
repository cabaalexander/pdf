const puppeteer = require('puppeteer');

const __evaluate = sel =>
  [...document.querySelectorAll(sel)].map(x => x.href)

const getUrls = async ({
  url,
  selector = 'a',
}) => {

  if (!url) {
    console.log('No url provided');
    return;
  }

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  const urls = await page
    .evaluate(__evaluate, selector)
    .catch(err => { console.log(`The error is: ${err}`) });

  browser.close();

  return urls;

}

module.exports = getUrls;
