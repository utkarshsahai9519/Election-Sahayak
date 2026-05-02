import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Step2_Identity = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-navyblue-600 dark:text-navyblue-400">{t.identity_title}</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-center">
        {t.identity_desc}
      </p>
      
      <button 
        className="w-full bg-saffron-500 hover:bg-saffron-600 text-white py-4 rounded-xl text-lg font-medium mb-4 shadow-lg shadow-saffron-500/30 transition-all"
        onClick={() => navigate('/step3')}
      >
        {t.biometric_btn}
      </button>

      <button 
        className="w-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 py-4 rounded-xl text-lg font-medium transition-all"
        onClick={() => navigate('/step3')}
      >
        {t.skip_btn}
      </button>
    </div>
  );
};

export default Step2_Identity;
