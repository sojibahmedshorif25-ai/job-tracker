import express from "express";
import {
  checkUser,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
  multipleUpload,
  singleUpload,
} from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.put("/update-profile", protect, multipleUpload, updateProfile);
router.get("/logout", logout);
router.get("/check", protect, checkUser);

export default router;
