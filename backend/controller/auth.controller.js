import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export async function signUp(req, res, next) {
  const salt = 10;
  const { userName, firstName, lastName, password, email } =
    req.body;
  if (
    !userName ||
    !firstName ||
    !lastName ||
    !password ||
    !email 
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const user = await User.findOne({ email: email });

  if (user) {
    next(errorHandler(400, "User already exists"));
  }
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    userName,
    firstName,
    lastName,
    password: hashedPassword,
    email,
  });
  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
}

export async function signIn(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(errorHandler(400, "Invalid credentials"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...others } = user._doc;
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(others);
  } catch (error) {
    return next(error);
  }
}


export async function google(req,res,next){
  const { email, name, googlePhotoUrl } = req.body;
  // console.log(email, name , googlePhotoUrl);
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hash(generatedPassword, 10);
      const newUser = new User({
        userName:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}
