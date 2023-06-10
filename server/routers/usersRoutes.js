import express from "express";
import {
  getUser,
  updateUser,
  addUser,
  revealUser,
  switchUser,
} from "../controllers/users.js";
import verify from "../middleware/authenticate.js";

const router = express.Router();

// Api end point to get the user data
router.get("/:id", getUser);

// Api end point to ass a user 
router.post("/register", addUser);

// Api end point to edit the user data
router.patch("/:id/edit", updateUser);

// Api end point to reveal the user data
router.get("/:id/reveal", verify, revealUser);

// Api end point to open or close the user data
router.put("/:id/switch", verify, switchUser);

export default router;
