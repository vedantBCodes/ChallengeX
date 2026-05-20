import express from "express";
import { createSubscriber } from "../controller/subscriber.controller.js";

const router = express.Router();

router.post("/", createSubscriber);

export default router;
