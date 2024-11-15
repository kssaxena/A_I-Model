import express from "express";
import { custom1 } from "../controllers/input.controllers";

const router = express.Router();

router.route("/custom-1").get(custom1);

export default router;
