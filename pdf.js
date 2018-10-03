const fs = require('fs');
const puppeteer = require('puppeteer');
const { distPath } = require('./constants.js');

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

  fs.existsSync(distPath) || fs.mkdirSync(distPath);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  const pageTitle = title || await page.title();
  const firstWord = pageTitle.slice(0, pageTitle.indexOf('-') - 1);
  const pdf_out = output || `${__dirname}/${distPath}/${pdfPrefix}${firstWord}.pdf`;

  await page.evaluate(() => {
    const footers = document
      .querySelectorAll('.footdiv')
      .forEach((element) => element.parentNode.removeChild(element));
  });

  await page.pdf({path: pdf_out});

  console.log(`Created: ${pdf_out}`);

  await browser.close();
};

module.exports = pdf;

