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
    const { prompt, locationContext, language, userInfo } = req.body;

    const constituency = locationContext?.constituency || 'Unknown';
    const state = locationContext?.state || 'Unknown';
    const preferredLanguage = language || 'English';
    const userName = userInfo?.name || 'Citizen';
    
    // Simple age calculation
    let isElderly = false;
    if (userInfo?.dob) {
      const birthDate = new Date(userInfo.dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      isElderly = age >= 60;
    }

    // Dynamic system prompt based on age and name
    let systemInstruction = `You are 'Election Sahayak', a highly respectful and helpful assistant for Indian citizens. Speak ONLY in ${preferredLanguage}. 
    The user's name is ${userName}. Always greet them respectfully by name. 
    The user is located in the constituency of ${constituency}, ${state}. Provide direct, localized answers.`;

    if (isElderly) {
      systemInstruction += `\nCRITICAL: The user is an elderly citizen. You MUST speak very simply, respectfully, and clearly. Avoid any technical jargon. Be extremely patient and use comforting, polite language. Use culturally appropriate respectful greetings.`;
    } else {
      systemInstruction += `\nCRITICAL: The user is a younger citizen. You should be professional, efficient, and clear. Provide detailed but concise information without over-simplifying, while maintaining a polite tone.`;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
