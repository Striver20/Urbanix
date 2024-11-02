const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description both are required ",
      });
    }

    const existingCategory = await categoryModel.findOne({ name });

    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    const newCategory = await new categoryModel({
      name,
      slug: slugify(name),
      description, // Added description here
    }).save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (err) {
    console.error("Error creating category: ", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error creating category" });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const id = req.params.id; // Fixed parameter extraction
    if (!name || !description) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name and Description both are required",
        });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), description: description },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category: category,
    });
  } catch (err) {
    console.error("Error updating category", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error updating category" });
  }
};

// Get All Category
const categoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({ success: true, data: categories });
  } catch (err) {
    console.error("Error fetching all categories", err.message);
    res
      .status(500)
      .send({ success: false, message: "Error fetching all categories" });
  }
};

// Single Category
const singleCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).send({ success: true, data: category });
  } catch (err) {
    console.error("Error fetching single category", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching single category" });
  }
};

// Delete category
const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category", err.message);
    res
      .status(500)
      .json({ success: false, message: "Error deleting category" });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
};
