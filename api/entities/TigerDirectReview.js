class TigerDirectReview {
  constructor({
    reviewComment, reviewerName, reviewDate, rating,
  }) {
    this.reviewComment = reviewComment;
    this.reviewerName = reviewerName;
    this.reviewDate = reviewDate;
    this.rating = rating;
  }
}

module.exports = {
  TigerDirectReview,
};
