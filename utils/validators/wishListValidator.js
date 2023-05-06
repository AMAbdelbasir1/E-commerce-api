const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const Product = require("../../models/productModel");

exports.createWishListValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid product id format")
    .custom((val, { req }) =>
      // Check if logged user create review before
      Product.findOne({ _id: req.body.productId }).then((product) => {
        if (!product) {
          return Promise.reject(new Error(`this no product for this ${val}`));
        }
      }),
    ),
  validatorMiddleware,
];

exports.deleteReviewValidator = [
  validatorMiddleware,
];
