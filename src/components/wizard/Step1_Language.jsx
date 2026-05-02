import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Step1_Language = () => {
  const navigate = useNavigate();
  const { updateLanguage, t } = useTranslation();

  const languages = [
    'English', 'हिंदी', 'অসমীয়া', 'বাংলা', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം', 'मराठी', 'ਪੰਜਾਬੀ', 'தமிழ்', 'తెలుగు', 'اردو',
    'बड़ो', 'डोगरी', 'कॉशुर', 'कोंकणी', 'मैथिली', 'ꯃꯤꯇꯩꯂꯣꯟ', 'নেपाली', 'ଓଡ଼ିଆ', 'संस्कृतम्', 'ᱥᱟᱱᱛᱟᱲᱤ', 'सिन्धी'
  ];

  const handleLanguageSelect = (lang) => {
    updateLanguage(lang);
    navigate('/step1.5');
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-black mb-6 text-center text-slate-900">{t.choose_language}</h2>
      <p className="text-slate-700 mb-8 text-center font-medium">
        {t.select_language_desc}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full overflow-y-auto max-h-[400px] p-2 scrollbar-thin scrollbar-thumb-saffron-200">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageSelect(lang)}
            className="glass-button py-3 rounded-lg text-md font-medium hover:bg-[#ffedd5] dark:hover:bg-slate-700 focus:ring-2 focus:ring-saffron-500 focus:outline-none transition-all"
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step1_Language;
