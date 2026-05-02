import { useState, useCallback } from 'react';

export const useVertexAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateText = useCallback(async (prompt, locationContext = null) => {
    setLoading(true);
    setError(null);
    const language = localStorage.getItem('electionSahayakLang') || 'English';
    const userInfo = {
      name: localStorage.getItem('electionSahayakName'),
      dob: localStorage.getItem('electionSahayakDOB')
    };
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, locationContext, language, userInfo })
      });

      if (!response.ok) {
        throw new Error('Failed to generate response from server');
      }

      const data = await response.json();
      setLoading(false);
      return data.text;
    } catch (err) {
      setLoading(false);
      setError(err.message || 'An error occurred');
      throw err;
    }
  }, []);

  return { generateText, loading, error };
};
