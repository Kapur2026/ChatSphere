import express from "express";
import { messsage } from "../controllers/chatbot.message.js";

const router = express.Router();

router.post("/message", messsage);  
 
export default router;
