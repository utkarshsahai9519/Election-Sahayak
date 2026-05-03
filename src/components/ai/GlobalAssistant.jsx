import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Mic, Send, Volume2, VolumeX, Minimize2 } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../context/AuthContext';
import { useVertexAI } from '../../hooks/useVertexAI';
import DOMPurify from 'dompurify';
import { speakText } from '../../utils/tts';

const GlobalAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const messagesEndRef = useRef(null);
  
  const { t, language } = useTranslation();
  const { userData } = useAuth();
  const { generateText, loading } = useVertexAI();

  useEffect(() => {
    // Add initial greeting based on language
    setMessages([
      { role: 'assistant', content: t('ask_anything') || "Hello! I am Election Sahayak. How can I help you today? Ask me about voter registration, candidates, or polling booths." }
    ]);
  }, [language, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const sanitizedInput = DOMPurify.sanitize(input);
    const userMsg = { role: 'user', content: sanitizedInput };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    try {
      const locationContext = userData?.location ? `${userData.location.city}, ${userData.location.state}, ${userData.location.constituency}` : null;
      // Provide system context to ground the AI in ECI resources
      const prompt = `System: You are Election Sahayak, an official assistant grounded in the Election Commission of India (https://www.eci.gov.in) resources and Helpline 1950. Tone: Professional, clear, no emojis. Language: ${language}. Context: User is from ${locationContext}. User Query: ${sanitizedInput}`;
      
      const response = await generateText(prompt, locationContext);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      speakResponse(response);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later or call Helpline 1950." }]);
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    // Map language to BCP 47 code for speech recognition
    const langMap = { 'English': 'en-IN', 'हिंदी': 'hi-IN', 'मराठी': 'mr-IN', 'বাংলা': 'bn-IN' };
    recognition.lang = langMap[language] || 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const speakResponse = (text) => {
    if (!voiceOn) return;
    speakText(text, language);
  };

  const toggleVoice = () => {
    setVoiceOn(!voiceOn);
    if (voiceOn) window.speechSynthesis?.cancel();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center focus:outline-none"
            aria-label="Open AI Assistant"
          >
            {/* Avatar Container */}
            <div className="w-16 h-16 bg-slate-900 rounded-full border-2 border-saffron-500 shadow-2xl flex items-center justify-center overflow-hidden transition-all group-hover:border-indiagreen-500">
               <div className="text-white">
                  <MessageSquare size={32} />
               </div>
               <div className="absolute inset-0 bg-saffron-500/10 group-hover:bg-indiagreen-500/10 transition-colors"></div>
            </div>
            
            {/* Pulse Indicator */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-indiagreen-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg">
               <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>

            {/* Tooltip */}
            <div className="absolute right-20 bg-white px-4 py-2 rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
               <p className="text-xs font-black text-slate-800 tracking-tight">How can I help you today?</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-0 right-0 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-saffron-200 overflow-hidden"
            aria-label="AI Assistant Interface"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-saffron-500 to-saffron-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center shadow-sm">
                   <MessageSquare size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Election Sahayak</h3>
                  <p className="text-[10px] text-saffron-100 uppercase font-black tracking-widest">Official AI Assistant</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={toggleVoice} className="p-2 hover:bg-white/20 rounded-full transition-colors" aria-label="Toggle Voice output">
                  {voiceOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors" aria-label="Close Assistant">
                  <Minimize2 size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-saffron-500 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2 text-slate-500 text-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      <span className="w-2 h-2 bg-saffron-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                    </div>
                  </div>
                </div>
              )}
              {messages.length < 3 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {['Find my booth', 'Check registration', 'Upcoming dates'].map(chip => (
                    <button 
                      key={chip}
                      onClick={() => setInput(chip)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-600 hover:border-saffron-400 hover:text-saffron-600 transition-all shadow-sm"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-200 flex gap-2 items-center">
              <button 
                onClick={startListening} 
                className={`p-3 rounded-full flex-shrink-0 transition-colors ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                aria-label="Use Microphone"
              >
                <Mic size={20} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('ask_anything') || "Ask me about voter registration..."}
                className="flex-1 bg-slate-100 border-none rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-saffron-400 text-sm"
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || loading}
                className="p-3 bg-saffron-500 hover:bg-saffron-600 disabled:bg-saffron-300 text-white rounded-full flex-shrink-0 transition-colors shadow-md"
                aria-label="Send Message"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalAssistant;
