'use strict';

const path = require('path');

const pdf = require('./src/pdf.js');
const getUrls = require('./src/get-urls.js');

const main = async ({
  url,
  selector,
  options: {
    title = x => x,
    pdfPrefix = x => `${+x + 1}.`,
    group,
    __eval = x => x,
  },
}) => {

  let urls = await getUrls({
    url: url,
    selector: selector,
  });

  for (let idx in urls) {

    await pdf({
      url: urls[idx],
      title: title,
      pdfPrefix: pdfPrefix(idx),
      __eval: __eval,
      group: group,
    })

  }

}

// #########
// #       #
// # Begin #
// #       #
// #########

const [nodeBin, thisFile, ...configs] = process.argv;

for (let config of configs) {

  try {

    const requiredConfig = [config]
      .map(x => path.resolve(x))
      .map(x => require(x))
    [0];

    main(requiredConfig);

  } catch (e) {

    console.error(e);

  }

}

