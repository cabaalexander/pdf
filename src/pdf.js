const fs = require('fs');
const puppeteer = require('puppeteer');
const mkdirp = require('mkdirp');

const { dist } = require('../config/constants.js');

const pdf = async ({
  url,
  pdfPrefix = '',
  title = x => x,
  group = 'untitled',
  output,
  eval = x => x,
} = {}) => {
  if (!url) {
    console.log('No url provided');
    return;
  }

  // Create browser and go to URL
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  const distChapters = `${dist}/${group}/chapters`;

  fs.existsSync(distChapters) || mkdirp.sync(distChapters);

  const pageTitle = title(await page.title())
  const pdf_out = output
    || `${distChapters}/${pdfPrefix}${pageTitle}.pdf`;

  // Evaluate
  eval && await page.evaluate(eval);

  // Print to PDF
  await page.pdf({path: pdf_out});

  // Info
  console.log(`Created: ${pdf_out}`);

  await browser.close();
};

module.exports = pdf;

