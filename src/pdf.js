const fs = require('fs');
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');

const { chapters } = require('../config/constants.js');

const pdf = async ({
  url,
  pdfPrefix = '',
  title,
  output,
} = {}) => {
  if (!url) {
    console.log('No url provided');
    return;
  }

  fs.existsSync(chapters) || mkdirp.sync(chapters);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  const pageTitle = title || await page.title();
  const firstWord = pageTitle.slice(0, pageTitle.indexOf('-') - 1);
  const pdf_out = output || `${chapters}/${pdfPrefix}${firstWord}.pdf`;

  await page.evaluate(() => {
    document
      .querySelectorAll('.footdiv')
      .forEach((element) => element.parentNode.removeChild(element));
  });

  await page.pdf({path: pdf_out});

  console.log(`Created: ${pdf_out}`);

  await browser.close();
};

module.exports = pdf;

