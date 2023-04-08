const mongoose = require('mongoose');
const fs = require('fs');

const Category = require('../models/CategoriesModel');

// GET all Categories
const getCategories = async (req, res) => {
  const categories = await Category.find({}).sort({ createdAt: -1 });

  res.status(200).json(catogeries);
};

// get a single Category
const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Category' });
  }
  const category = await Category.findById(id);

  if (!category) {
    return res.status(404).json({ error: 'No such Category' });
  }
  res.status(200).json(category);
};

// create new Category
const createCategory = async (req, res) => {
  const { name, imgpath } = req.body;

  let emptyFields = [];

  if (!imgpath) {
    emptyFields.push('imgpath');
  }
  if (!name) {
    emptyFields.push('name');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the Fields', emptyFields });
  }

  // add doc to db
  try {
    const category = await Banner.create({
      name,
      imgpath,
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Banner
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findOneAndDelete({ _id: id });
  if (!category) {
    return res.id.status(404).json({ error: 'No such Category' });
  }

  res.status(200).json(category);
};

// update a banner
const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.id.status(404).json({ error: 'No such Category' });
  }

  const category = await Banner.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!category) {
    return res.id.status(404).json({ error: 'No such category' });
  }

  res.status(200).json(category);
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
