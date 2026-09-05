import express from "express";
import { generateEmail, getEmailHistory, clearEmailHistory } from "../controllers/emailController.js";

const router = express.Router();

router.post("/generate", generateEmail);
router.get("/history", getEmailHistory);
router.delete("/history", clearEmailHistory);

export default router;
