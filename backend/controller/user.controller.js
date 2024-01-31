import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import product from "../models/product.js";
import Cart from "../models/cart.js";

export async function getUsers(req, res, next) {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all users"));
  }
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function UpdateUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }
  }

  if (req.body.userName) {
    if (req.body.userName.length < 7 || req.body.userName.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }

    if (req.body.userName.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }

    if (req.body.userName !== req.body.userName.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }

    if (!req.body.userName.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      await product.deleteMany({ user: user._id });
      await Cart.deleteMany({ user: user._id });
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export function signout(req, res, next) {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      message: "Signout successfully",
    });
  } catch (error) {
    next(error);
  }
}
