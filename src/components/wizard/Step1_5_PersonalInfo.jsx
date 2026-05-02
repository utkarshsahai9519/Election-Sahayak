import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Step1_5_PersonalInfo = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: localStorage.getItem('electionSahayakName') || '',
    dob: localStorage.getItem('electionSahayakDOB') || '',
    voterId: localStorage.getItem('electionSahayakVoterID') || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('electionSahayakName', formData.name);
    localStorage.setItem('electionSahayakDOB', formData.dob);
    localStorage.setItem('electionSahayakVoterID', formData.voterId);
    navigate('/step2');
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">{t.personal_info_title}</h2>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-center">
        {t.personal_info_desc}
      </p>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 p-6 glass-panel rounded-2xl shadow-xl">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">{t.name_label}</label>
          <input 
            type="text" 
            required
            placeholder={t.name_placeholder}
            className="w-full p-4 rounded-xl bg-white/80 dark:bg-slate-800 border border-saffron-200 dark:border-slate-700 focus:ring-2 focus:ring-saffron-500 outline-none transition-all shadow-inner"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">{t.dob_label}</label>
          <input 
            type="date" 
            required
            className="w-full p-4 rounded-xl bg-white/80 dark:bg-slate-800 border border-saffron-200 dark:border-slate-700 focus:ring-2 focus:ring-saffron-500 outline-none transition-all shadow-inner"
            value={formData.dob}
            onChange={(e) => setFormData({...formData, dob: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">{t.voter_id_label}</label>
          <input 
            type="text" 
            placeholder={t.voter_id_placeholder}
            className="w-full p-4 rounded-xl bg-white/80 dark:bg-slate-800 border border-saffron-200 dark:border-slate-700 focus:ring-2 focus:ring-saffron-500 outline-none transition-all shadow-inner uppercase"
            value={formData.voterId}
            onChange={(e) => setFormData({...formData, voterId: e.target.value})}
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-saffron-500 hover:bg-saffron-600 text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-saffron-500/30 transition-all mt-4 transform active:scale-95"
        >
          {t.continue}
        </button>
      </form>
    </div>
  );
};

export default Step1_5_PersonalInfo;
