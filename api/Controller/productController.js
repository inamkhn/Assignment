// import  asyncHandler  from "../middleware/asyncHandler"
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";


export const createProduct = async (req, res) => {
  const {
    name,
    description,
    colors
  } = req.body;
  const product = new Product({
    name: name,
    description: description,
    colors: colors,
  });

  console.log(product);
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};


