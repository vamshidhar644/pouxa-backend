const mongoose = require('mongoose');
const fs = require('fs');
const Banner = require('../models/BannerModel');

// GET all Banners
const getBanners = async (req, res) => {
  const banners = await Banner.find({}).sort({ createdAt: -1 });

  res.status(200).json(banners);
};

// get a single Banner
const getBanner = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Banner' });
  }
  const banner = await Banner.findById(id);

  if (!banner) {
    return res.status(404).json({ error: 'No such Banner' });
  }
  res.status(200).json(banner);
};

// create new Banner
const createBanner = async (req, res) => {
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
    const banner = await Banner.create({
      name,
      imgpath,
    });
    res.status(200).json(banner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Banner
const deleteBanner = async (req, res) => {
  const { id } = req.params;

  const banner = await Banner.findOneAndDelete({ _id: id });
  if (!banner) {
    return res.id.status(404).json({ error: 'No such Banner' });
  }

  res.status(200).json(banner);
};

// update a banner
const updateBanner = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.id.status(404).json({ error: 'No such Banner' });
  }

  const banner = await Banner.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!banner) {
    return res.id.status(404).json({ error: 'No such banner' });
  }

  res.status(200).json(banner);
};

module.exports = {
  createBanner,
  getBanner,
  getBanners,
  deleteBanner,
  updateBanner,
};
