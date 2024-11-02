const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
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
module.exports = router;
