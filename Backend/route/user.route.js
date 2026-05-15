import express from "express";
import { signup, login, checkEmail } from "../controller/user.controller.js";
const router = express.Router();

router.post("/check-email", checkEmail);
router.post("/signup", signup);
router.post("/login", login);

export default router;
