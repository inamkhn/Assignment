import mongoose from "mongoose";

// Define schema for tone and shade
const ToneShadeSchema = new mongoose.Schema({
  tone: {
    type: String,
    required: true,
  },
  shade: {
    type: String,
    required: true,
  },
});

// Define schema for color
const ColorSchema = new mongoose.Schema({
  color: {
    type: String,
    required: false,
  },
  colors : [ToneShadeSchema],
});

// Define schema for product
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  colors: [ColorSchema],
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
