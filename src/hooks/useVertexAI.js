import { useState, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useVertexAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateText = useCallback(async (prompt, locationContext = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY is not configured");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      // Switching to gemini-pro as gemini-1.5-flash is reporting NOT_FOUND on current endpoint
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        systemInstruction: `You are 'Election Sahayak', a highly respectful and helpful assistant for Indian citizens. 
        You are an official guide grounded in the resources of the Election Commission of India (https://www.eci.gov.in).
        Location: ${locationContext?.constituency || 'India'}, ${locationContext?.state || ''}.
        Persona: Knowledgeable, patient, and polite Indian man. Neutral and non-political.`
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setLoading(false);
      return text;
    } catch (err) {
      console.error("Gemini AI Error:", err);
      setLoading(false);
      setError(err.message || 'An error occurred');
      throw err;
    }
  }, []);

  return { generateText, loading, error };
};
