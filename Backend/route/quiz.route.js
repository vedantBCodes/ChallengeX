import express from "express";
import { getQuiz } from "../controller/quiz.controller.js";

const router = express.Router();

router.get("/", getQuiz);

export default router;