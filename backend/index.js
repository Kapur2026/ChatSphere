
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.route.js';  
const app = express();
const port = process.env.PORT ||3000;  

app.use(express.json());
app.use(cors());  

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    }); 

app.use("/bot/v1/", chatbotRoutes);




app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
