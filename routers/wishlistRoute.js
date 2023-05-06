const express = require("express");

const authService = require("../services/authService");
const {
  createWishListValidator
} = require("../utils/validators/wishListValidator");

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../services/wishlistService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router.route("/").post(createWishListValidator,addProductToWishlist).get(getLoggedUserWishlist);

router.delete("/:productId", removeProductFromWishlist);

module.exports = router;
