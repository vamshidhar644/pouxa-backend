const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BannerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imgpath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Banner', BannerSchema);
