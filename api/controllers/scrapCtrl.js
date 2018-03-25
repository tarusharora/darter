const phantom = require('phantom');
const _isEmpty = require('lodash/isEmpty');

const { mapTigerDirectReviews } = require('../mappers/reviewMapper.js');
const { tigerDirect } = require('../config/index.config');


const scraperAsync = async (productUrl) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  let reviewList = [];
  let pageNumber = 0;
  const { sortOrder, reviewsPerPage } = tigerDirect;
  // TODO Remove while loop in favour of asynchronous async/promises
  while (true) {
    await page.open(`${productUrl}&pagenumber=${pageNumber}&RSort=${sortOrder}&csid=ITD&recordsPerPage=${reviewsPerPage}`);
    const content = await page.property('content');
    let mappedReviews;
    if (_isEmpty(mappedReviews = mapTigerDirectReviews(content))) {
      break;
    }
    reviewList = [...reviewList, ...mappedReviews];
    pageNumber = +1;
  }
  await instance.exit();
  return reviewList;
};

const reviewScraper = (req, res) => {
  const { productUrl } = req.body;
  scraperAsync(productUrl).then((scrapedData) => {
    // TODO Save data to DB asynchronously
    res.send(scrapedData);
  })
    .catch((err) => {
      // TODO Log error
      res.status(500).send(err);
    });
};

module.exports = {
  reviewScraper,
};
