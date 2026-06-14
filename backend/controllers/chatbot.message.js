import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const messsage = async (req, res) => {
    console.log("message")
    try {
        const { text } = req.body;
        if (!text?.trim()) {
            return res.status(400).json({ error: "Text query parameter is required" });
        }

        const user = await User.create({ sender: "user", text });
        // const botResponse = {
        //     "hello": "Hello! How can I assist you today?",
        //     "how are you?": "I'm just a bot, but I'm here to help you!",
        //     "what's your name?": "I'm ChatBot, your virtual assistant.",
        //     "bye": "Goodbye! Have a great day!"
        // };
        //    const normalizedText = text.toLowerCase().trim();
        //     const botReply = botResponse[normalizedText] || "I'm sorry, I don't understand that.";

        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash"
        });

        const result = await model.generateContent(text);
        const botReply = result.response.text();

        const bot = await Bot.create({ sender: "bot", text: botReply });

        return res.status(200).json({ user: user.text, bot: bot.text });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred while processing the message" });
    }
}
