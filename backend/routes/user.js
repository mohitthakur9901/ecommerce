import express from "express";
import {
  UpdateUser,
  deleteUser,
  getUser,
  getUsers,
  signout
} from "../controller/user.controller.js";
import { verifyJwt } from "../middlewares/validateUser.js";

const router = express.Router();

router.get("/", verifyJwt, getUsers);
router.get("/:id", verifyJwt, getUser);
router.put("/:id", verifyJwt, UpdateUser);
router.delete("/:id", verifyJwt, deleteUser);
router.post("/signout", signout);

export default router;
