import React, { useState, useEffect } from 'react';
import { useVertexAI } from '../../hooks/useVertexAI';
import { useTranslation } from '../../hooks/useTranslation';

const TextAssist = ({ locationContext, initialQuery, onQueryConsumed }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const { generateText, loading } = useVertexAI();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialQuery && initialQuery.trim() !== '') {
      handleSend(initialQuery);
      if (onQueryConsumed) onQueryConsumed();
    }
  }, [initialQuery]);

  const handleSend = async (overrideInput = null) => {
    const textToSend = typeof overrideInput === 'string' ? overrideInput : input;
    if (!textToSend.trim()) return;
    
    const userMsg = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (textToSend === input) setInput('');
    
    try {
      const response = await generateText(userMsg.content, locationContext);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }]);
    }
  };

  return (
    <div className="w-full flex flex-col h-[400px] glass-panel rounded-xl overflow-hidden mt-4">
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-center text-slate-500 my-auto">{t.ask_anything}</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded-lg max-w-[85%] ${msg.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-slate-100 dark:bg-slate-800 self-start'}`}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg max-w-[85%] self-start animate-pulse text-slate-500">
            {t.thinking}
          </div>
        )}
      </div>
      <div className="p-3 border-t border-slate-200 dark:border-slate-700 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t.ask_anything}
          className="flex-1 bg-transparent border-none focus:ring-0 outline-none px-2"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50 transition-all hover:bg-blue-700"
        >
          {t.continue}
        </button>
      </div>
    </div>
  );
};

export default TextAssist;
