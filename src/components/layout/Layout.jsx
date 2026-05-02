import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const Layout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <div className="tricolor-bar"></div>
      <header className="glass-panel sticky top-0 z-50 px-4 py-3 flex justify-between items-center border-b-2 border-navyblue-500">
        <button 
          onClick={() => navigate('/step1')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left"
        >
          <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-100">
            <img src="/logo.png" alt="Election Sahayak Logo" className="h-10 w-10 min-w-[40px] object-contain" />
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-navyblue-600 dark:text-navyblue-400 tracking-tight leading-tight">
            Election Sahayak
          </h1>
        </button>
      </header>
      
      <main className="flex-1 flex flex-col items-center p-4 max-w-md mx-auto w-full pt-8">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-sm text-slate-500 dark:text-slate-400 flex flex-col items-center gap-2">
        <p className="text-xs italic opacity-75">{t.change_lang_guide}</p>
        <div className="flex items-center gap-1 font-bold text-navyblue-600">
          <span>IND</span>
        </div>
        <div>&copy; {new Date().getFullYear()} Election Sahayak</div>
      </footer>
    </div>
  );
};

export default Layout;
