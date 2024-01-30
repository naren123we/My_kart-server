const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },

  colors: [
    {
      type: String,
    },
  ],

  image: [
    {
      type: String,
      trim: true,
    },
  ],
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  featured: {
    type: Boolean,
  },
  reviews: {
    type: Number,
  },
  stars: {
    type: Number,
  },
});

module.exports = mongoose.model("products", productSchema);
