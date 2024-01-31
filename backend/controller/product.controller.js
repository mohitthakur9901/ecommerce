import { errorHandler } from "../utils/error.js";
import Product from "../models/product.js";

export async function createProduct(req, res, next) {
  try {
    if (!req.user.isAdmin) {
      return next(
        errorHandler(403, "You are not authorized to create a product")
      );
    }

    const {
      productImage,
      productName,
      productPrice,
      productCategory,
      productDescription,
      productQuantity,
    } = req.body;

    if (
      !productImage ||
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDescription ||
      !productQuantity
    ) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const product = new Product({
      productImage,
      productName,
      productPrice,
      productCategory,
      productDescription,
      productQuantity,
    });

    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, "Duplicate product name or category"));
    }
    next(error);
  }
}

export async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}
export async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(errorHandler(404, "Product not found"));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}
export async function updateProduct(req, res, next) {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not authorized to update product"));
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!product) return next(errorHandler(404, "Product not found"));
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  if (!req.user.isAdmin)
    return next(errorHandler(403, "You are not authorized to delete product"));
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(errorHandler(404, "Product not found"));
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
