import express from "express";
import { createContactMessage } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", createContactMessage);

export default router;
