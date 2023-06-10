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

router.get("/:id", getUser);
router.post("/register", addUser);
router.patch("/:id/edit", updateUser);
router.get("/:id/reveal", verify, revealUser);
router.put("/:id/switch", verify, switchUser);

export default router;
