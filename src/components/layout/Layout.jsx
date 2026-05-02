import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Layout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <div className="tricolor-bar"></div>
      <header className="glass-panel sticky top-0 z-50 px-4 py-3 flex justify-between items-center border-b-2 border-saffron-500/20 shadow-sm">
        <button 
          onClick={() => navigate('/step1')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left cursor-pointer active:scale-95"
        >
          <img src="/logo.png" alt="Election Sahayak Logo" className="h-10 w-10 min-w-[40px] object-contain p-1 bg-white rounded-lg shadow-sm" />
          <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Election Sahayak
          </h1>
        </button>
      </header>
      
      <main className="flex-1 flex flex-col items-center p-4 max-w-md mx-auto w-full pt-8">
        <Outlet />
      </main>

      <footer className="p-6 text-center text-sm text-slate-600 dark:text-slate-400 flex flex-col items-center gap-2 border-none mt-auto">
        <p className="text-sm font-bold text-slate-900 bg-saffron-100/50 px-4 py-1 rounded-full border border-saffron-300/30 shadow-sm">
          {t.change_lang_guide}
        </p>
        <div className="flex items-center gap-2 font-black text-slate-900 mt-2">
          <span className="tracking-[0.2em] border-x-2 border-slate-800 px-2">IND</span>
        </div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
          &copy; 2026 Election Sahayak
        </div>
      </footer>
    </div>
  );
};

export default Layout;
