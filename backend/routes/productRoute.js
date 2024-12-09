const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  filterProductController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
} = require("../controllers/productController");
const formidable = require("express-formidable");
const { get } = require("mongoose");
const router = express.Router();

// routes

// create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//  get photo
router.get("/product-photo/:id", productPhotoController);

// delete product
router.delete("/delete-product/:id", deleteProductController);

// filter product
router.post("/filter-product", filterProductController);

// product count
router.get("/product-count", productCountController);

//poduct per page
router.get("/product-list/:page", productListController);

// search product
router.get("/search-product/:keyword", searchProductController);

// similar product
router.get("/related-products/:pid/:cid", relatedProductController);

// category wise product
router.get("/product-category/:slug", productCategoryController);

module.exports = router;
