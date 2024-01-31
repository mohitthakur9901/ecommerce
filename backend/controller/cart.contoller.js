import Cart from "../models/cart.js";
import { errorHandler } from "../utils/error.js";

export async function createCart(req, res, next) {
  const { userId, productId, quantity } = req.body;

  try {
    const findUserInCart = await Cart.findOne({ userId });
    if (!findUserInCart) {
      const newCart = new Cart({
        userId,
        cartItems: [{ productId, quantity }],
      });
      await newCart.save();
      res.status(200).json(newCart);
    } else {
      findUserInCart.cartItems.push({ productId, quantity });
      await findUserInCart.save();
      res.status(200).json(findUserInCart);
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
}

export async function getCart(req, res, next) {
  const { id } = req.params;
  try {
    const findUserInCart = await Cart.findOne({ userId: id });
    res.status(200).json(findUserInCart);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
}

export async function updateCart(req, res, next) {
  const { userId, productId, quantity } = req.body;
  try {
    const findUserInCart = await Cart.findOne({ userId });
    const findProductInCart = await findUserInCart.cartItems.findIndex(
      (item) => item.productId.toString === productId
    );
    if (findProductInCart !== -1) {
      return next(errorHandler(404, "Product not found"));
    } 
    findUserInCart.cartItems[findProductInCart].quantity = quantity;
    await findUserInCart.save();
    res.status(200).json(findUserInCart);
    next(errorHandler(500, error.message));
  } catch (error) {
    next(errorHandler(500, error.message));
  }
}

export async function deleteCart(req, res, next) {
  const { userId, productId } = req.params;

  try {
    const user = await Cart.findOne({ userId: userId });
    const product = user.cartItems.find(
      (item) => item._id.toString() === productId
    );

    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }
    console.log(product._id);
    await Cart.findOneAndDelete(
      { userId: userId },
      { $pull: { cartItems: { productId: product._id } } }
    );
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
}
