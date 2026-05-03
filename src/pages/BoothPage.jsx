import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, ExternalLink, Phone, ShieldCheck, Info, CheckCircle2, XCircle, MousePointer2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function BoothPage() {
  const { userData } = useAuth();
  const { t } = useLanguage();
  const [pincode, setPincode] = useState(userData?.pincode || '');
  const [area, setArea] = useState('');

  const STEPS = [
    { id: 1, text: "Visit the official Election Commission of India (ECI) website: https://electoralsearch.eci.gov.in/" },
    { id: 2, text: `Enter your details like name, age, gender, and pincode (${pincode || '______'}) or state (${userData?.location?.state || 'Nagaland'}).` },
    { id: 3, text: "Verify your voter status using the OTP sent to your registered mobile number." },
    { id: 4, text: "Once verified, your polling booth details (name, address, and map link) will appear." },
    { id: 5, text: "If you don't have internet access, call the Voter Helpline number 1950 or visit your nearest Electoral Registration Office (ERO)." }
  ];

  const DO_LIST = [
    "Do check your name in the voter list (available on ECI website or at the booth).",
    "Do arrive early to avoid last-minute rush.",
    "Do follow instructions from polling officials.",
    "Do carry a mask (if COVID-19 precautions are in place)."
  ];

  const DONT_LIST = [
    "Don't carry mobile phones inside the voting compartment (they're allowed outside).",
    "Don't take photos or videos inside the booth.",
    "Don't argue with polling officials or other voters.",
    "Don't wear clothes/symbols that may influence voters."
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Booth Finder Card */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <MapPin className="text-saffron-500" size={24} /> Booth Finder
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Enter your pincode to get personalized booth guidance</p>
          </div>

          {/* Search Inputs */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="201306"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-saffron-500 outline-none font-bold text-slate-700 transition-all"
              />
            </div>
            <div className="flex-[1.5] relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Area / Locality (optional)"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-saffron-500 outline-none font-bold text-slate-700 transition-all"
              />
            </div>
            <button className="px-10 py-4 bg-saffron-600 hover:bg-saffron-700 text-white font-black rounded-2xl shadow-lg shadow-saffron-600/20 flex items-center justify-center gap-2 transition-all">
              <Search size={20} /> Search
            </button>
          </div>

          {/* Steps Section */}
          <div className="bg-saffron-50/50 border border-saffron-100 rounded-3xl p-8 space-y-6">
            <h2 className="text-sm font-black text-saffron-900 flex items-center gap-2">
              <MousePointer2 size={16} /> How to Find Your Booth
            </h2>
            <div className="space-y-4">
              {STEPS.map((step) => (
                <div key={step.id} className="flex gap-4">
                  <span className="w-6 h-6 rounded-lg bg-saffron-100 text-saffron-700 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">
                    {step.id}
                  </span>
                  <p className="text-xs font-bold text-saffron-800 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
            <a 
              href="https://electoralsearch.eci.gov.in/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-black text-saffron-600 uppercase tracking-widest hover:text-saffron-700 transition-colors"
            >
              <ExternalLink size={14} /> Open Electoral Search Portal
            </a>
          </div>

          {/* What to Carry */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <Info size={20} />
              </div>
              <h3 className="font-black text-slate-900 text-sm">What to Carry</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-xl text-[10px] font-black">EPIC (Voter ID card) - MOST IMPORTANT!</span>
              <span className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-bold">Alternative photo ID (PAN card, Aadhaar, Passport, Driving License, etc.) if you forget your EPIC.</span>
            </div>
          </div>

          {/* DOs and DON'Ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indiagreen-50/30 border border-indiagreen-100 rounded-3xl p-6">
              <h4 className="text-sm font-black text-indiagreen-700 flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} /> DOs
              </h4>
              <ul className="space-y-3">
                {DO_LIST.map((item, i) => (
                  <li key={i} className="flex gap-2 text-[11px] font-bold text-indiagreen-800 leading-relaxed">
                    <span className="text-indiagreen-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50/30 border border-red-100 rounded-3xl p-6">
              <h4 className="text-sm font-black text-red-700 flex items-center gap-2 mb-4">
                <XCircle size={18} /> DON'Ts
              </h4>
              <ul className="space-y-3">
                {DONT_LIST.map((item, i) => (
                  <li key={i} className="flex gap-2 text-[11px] font-bold text-red-800 leading-relaxed">
                    <span className="text-red-500">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Support Footer */}
      <div className="flex justify-center gap-4">
        <a href="tel:1950" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-700 hover:border-saffron-500 transition-all shadow-sm">
          <Phone size={16} className="text-saffron-500" /> Helpline 1950
        </a>
        <a href="https://www.eci.gov.in" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-700 hover:border-indiagreen-500 transition-all shadow-sm">
          <ExternalLink size={16} className="text-indiagreen-500" /> Official ECI Website
        </a>
      </div>
    </div>
  );
}
