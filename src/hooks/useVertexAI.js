import { useState } from 'react';

export const useVertexAI = () => {
  const [loading, setLoading] = useState(false);

  const generateText = async (prompt, locationContext) => {
    setLoading(true);
    try {
      // Get language from localStorage
      const language = localStorage.getItem('electionSahayakLang') || 'English';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, locationContext, language })
      });
      
      const data = await response.json();
      return data.text;
    } catch (e) {
      console.error(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { generateText, loading };
};
