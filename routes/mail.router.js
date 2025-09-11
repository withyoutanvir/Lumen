import express from "express";
import MailSender from "../controllers/mail.controller.js";

const router = express.Router();

// POST /send-mail
router.post("/send-mail", MailSender);

export default router;
