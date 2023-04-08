const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategoryModel = new Schema(
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

module.exports = mongoose.model('Categories', CategoryModel);
