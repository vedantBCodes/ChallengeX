import express from "express";
import { validateUpi } from "../controller/upiValidation.controller.js";

const router = express.Router();

router.post("/validate", validateUpi);

export default router;
