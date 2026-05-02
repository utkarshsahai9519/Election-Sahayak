import React, { useState } from 'react';
import TextAssist from '../ai/TextAssist';
import { useTranslation } from '../../hooks/useTranslation';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [initialQuery, setInitialQuery] = useState('');
  const { t } = useTranslation();

  const locationContext = JSON.parse(localStorage.getItem('electionSahayakLocation') || '{}');

  const quickActions = [
    { label: t.find_polling, icon: '📍', query: 'Where is my polling booth?' },
    { label: t.voter_slip, icon: '🎫', query: 'How to download my voter slip?' },
    { label: t.candidate_info, icon: '👤', query: 'Who are the candidates in my constituency?' },
  ];

  return (
    <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-navyblue-600 dark:text-navyblue-400">{t.title}</h2>
          <p className="text-slate-500">{locationContext.constituency}, {locationContext.state}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-md' : 'glass-button text-slate-600'}`}
        >
          {t.chat_tab}
        </button>
        <button 
          onClick={() => setActiveTab('video')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'video' ? 'bg-blue-600 text-white shadow-md' : 'glass-button text-slate-600'}`}
        >
          📹 Video
        </button>
      </div>

      {activeTab === 'chat' && (
        <>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {quickActions.map((action, i) => (
              <button 
                key={i}
                onClick={() => setInitialQuery(action.query)}
                className="glass-button p-4 rounded-xl flex items-center gap-4 text-left hover:scale-[1.02] active:scale-[0.98] transition-all border-l-4 border-l-saffron-500"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium text-slate-700 dark:text-slate-200">{action.label}</span>
              </button>
            ))}
          </div>

          <TextAssist 
            locationContext={locationContext} 
            initialQuery={initialQuery}
            onQueryConsumed={() => setInitialQuery('')}
          />
        </>
      )}

      {activeTab === 'video' && (
        <div className="glass-panel p-8 rounded-xl text-center text-slate-500">
          Video guides coming soon for your constituency.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
