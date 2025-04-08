import express from "express";
import { getTask } from "../controller/task.controller.js";

const router = express.Router();

router.get("/", getTask);

export default router;