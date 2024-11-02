const fs = require("fs");
const Products = require("../models/productModel");
const slugify = require("slugify");
// create product
const createProductController = async (req, res) => {
  try {
    const { name, description, slug, price, quantity, shipping, category } =
      req.fields;

    const { photo } = req.files;

    if (!name || !price || !description || !category || !shipping) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const product = new Products({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: product,
    });
  } catch (err) {
    console.error("Error creating product", err.message);
    res.status(500).json({ success: false, message: "Error creating product" });
  }
};

// update product
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, quantity, category, shipping } =
      req.fields;
    const { photo } = req.files;

    if (!name || !price || !description || !category || !shipping) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    let product = await Products.findById(req.params.pid);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product = await Products.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).json({
      success: true,
      message: "Product updated successfully",
      product: product,
    });
  } catch (err) {
    console.error("Error updating product: ", err.message);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

// get all products
const getProductController = async (req, res) => {
  try {
    const products = await Products.find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: "All Products fetched successfully",
      products: products,
    });
  } catch (err) {
    console.error("Error fetching products", err.message);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    if (!req.params.slug) {
      return res
        .status(400)
        .json({ success: false, message: "Slug is required" });
    }
    const product = await Products.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Single Product fetched successfully",
      product: product,
    });
  } catch (err) {
    console.error("Error fetching single product", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching Single product" });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).select("photo");
    console.log(product);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (!product.photo.data) {
      return res
        .status(404)
        .json({ success: false, message: "Product photo not found" });
    }
    res.set("Content-Type", product.photo.contentType);
    return res.status(200).send(product.photo.data);
  } catch (err) {
    console.error("Error fetching product photo", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching product photo" });
  }
};

// delete controller
const deleteProductController = async (req, res) => {
  try {
    console.log("Entered backend");
    console.log(req.params.pid);
    const product = await Products.findByIdAndDelete(req.params.id).select(
      "-photo"
    );
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found to delete" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product", err.message);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};

module.exports = {
  createProductController,
  updateProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
};
