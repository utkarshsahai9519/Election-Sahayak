import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Step1_Language = () => {
  const navigate = useNavigate();
  const { updateLanguage, t } = useTranslation();

  const languages = [
    { name: 'English', native: 'English' },
    { name: 'हिंदी', native: 'हिंदी' },
    { name: 'অসমীয়া', native: 'অসমীয়া' },
    { name: 'বাংলা', native: 'বাংলা' },
    { name: 'ગુજરાતી', native: 'ગુજરાતી' },
    { name: 'ಕನ್ನಡ', native: 'ಕನ್ನಡ' },
    { name: 'മലയാളം', native: 'മലയാളം' },
    { name: 'मराठी', native: 'मराठी' },
    { name: 'ਪੰਜਾਬੀ', native: 'ਪੰਜਾਬੀ' },
    { name: 'தமிழ்', native: 'தமிழ்' },
    { name: 'తెలుగు', native: 'తెలుగు' },
    { name: 'اردو', native: 'اردو' }
  ];

  const handleLanguageSelect = (langName) => {
    updateLanguage(langName);
    navigate('/step2');
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold mb-2 text-center text-navyblue-600 dark:text-navyblue-400">{t.choose_language}</h2>
      <p className="text-slate-500 mb-8 text-center">{t.select_language_desc || 'Select a language to get started'}</p>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        {languages.map((lang) => (
          <button 
            key={lang.name}
            className="glass-button py-6 rounded-xl text-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all border-b-4 border-b-saffron-500"
            onClick={() => handleLanguageSelect(lang.name)}
          >
            {lang.native}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1_Language;
