import { Router } from "express";
import {
  authenticatedUser,
  login,
  register,
  updateProfile,
} from "../controllers/index.js";
import { authenticated } from "../middlewares/index.js";
import { imageUpload } from "../libs/index.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Welcome to API V1",
  });
});

// Auth
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/authenticate", authenticated, authenticatedUser);

// Profile
router.put(
  "/profiles",
  authenticated,
  imageUpload.single("profile_picture"),
  updateProfile
);

export default router;
