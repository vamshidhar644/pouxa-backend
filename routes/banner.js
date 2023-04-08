const express = require('express');

// controller functions
const {
  createBanner,
  getBanner,
  getBanners,
  deleteBanner,
  updateBanner,
} = require('../controllers/BannerController');

const router = express.Router();

// GET all items
router.get('/', getBanners);

//GET a single item
router.get('/:id', getBanner);
 
// POST a new item
router.post('/', createBanner);

// DELETE a item
router.delete('/:id', deleteBanner);

// UPDATE a item
router.patch('/:id', updateBanner);

module.exports = router;
