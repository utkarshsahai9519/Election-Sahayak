import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Step4_Mode = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleModeSelect = (mode) => {
    localStorage.setItem('electionSahayakMode', mode);
    navigate('/dashboard');
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-navyblue-600 dark:text-navyblue-400">{t.mode_title}</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-center">
        {t.mode_desc}
      </p>
      
      <div className="grid gap-4 w-full">
        <button 
          className="glass-button py-6 rounded-xl text-lg font-medium flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
          onClick={() => handleModeSelect('text')}
        >
          <span className="text-3xl">💬</span>
          {t.text_chat}
        </button>
        <button 
          className="glass-button py-6 rounded-xl text-lg font-medium flex flex-col items-center gap-2 border-blue-400 dark:border-blue-500 shadow-md shadow-blue-500/20 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
          onClick={() => handleModeSelect('voice')}
        >
          <span className="text-3xl">🎙️</span>
          {t.voice_chat}
        </button>
        <button 
          className="glass-button py-6 rounded-xl text-lg font-medium flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
          onClick={() => handleModeSelect('video')}
        >
          <span className="text-3xl">📹</span>
          {t.video_call}
        </button>
      </div>
    </div>
  );
};

export default Step4_Mode;
