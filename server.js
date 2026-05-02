import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Log key prefix for debugging (securely)
const key = process.env.GOOGLE_VERTEX_AI_KEY;
console.log(`Backend initialized with key starting with: ${key ? key.substring(0, 7) : 'NULL'}`);

const genAI = new GoogleGenerativeAI(key);

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, locationContext, language } = req.body;

    const constituency = locationContext?.constituency || 'Unknown';
    const state = locationContext?.state || 'Unknown';
    const preferredLanguage = language || 'English';

    // Strict system prompt for an elderly user
    const systemInstruction = `You are 'Election Sahayak', a highly respectful and helpful assistant for Indian citizens. Speak very simply, respectfully, and clearly, as if explaining to an elderly citizen who may not be very tech-savvy. You MUST respond ONLY in ${preferredLanguage}. Do not use complex jargon. Be polite, patient, and use culturally appropriate respectful greetings if suitable. The user is asking about elections, and they are located in the constituency of ${constituency}, ${state}. Provide direct, localized, and simple answers. Keep it brief and comforting.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(`${systemInstruction}\n\nUser: ${prompt}`);
    const responseText = result.response.text();

    res.json({ text: responseText });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

// Serve static frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
