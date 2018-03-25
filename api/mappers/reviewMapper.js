const cheerio = require('cheerio');

const _isEmpty = require('lodash/isEmpty');

const { notApplicable } = require('../common/constants');

const { TigerDirectReview } = require('../entities/TigerDirectReview');


const mapTigerDirectReviews = (content) => {
  let reviewList = [];
  const $ = cheerio.load(content);
  const customerReviews = $('#customerReviews .review');
  if (_isEmpty(customerReviews)) {
    return reviewList;
  }
  reviewList = customerReviews
    .map(function () {
      const rightColContent = $(this).find('.rightCol');
      const leftColContent = $(this).find('.leftCol');
      const reviewerInfoText = leftColContent &&
                leftColContent.find('.reviewer').text();

      const reviewerGrp = /reviewer[\s:\n]*([^\n]+)/i.exec(reviewerInfoText);
      const reviewDateGrp = /date[\s:\n]*([^\n]+)/i.exec(reviewerInfoText);
      return new TigerDirectReview({
        rating: leftColContent && leftColContent.find('.itemRating').text(),
        reviewComment: rightColContent && rightColContent.text(),
        reviewDate: (reviewDateGrp && reviewDateGrp[1]) || notApplicable,
        reviewerName: (reviewerGrp && reviewerGrp[1]) || notApplicable,
      });
    }).get();
  return reviewList;
};


module.exports = {
  mapTigerDirectReviews,
};

