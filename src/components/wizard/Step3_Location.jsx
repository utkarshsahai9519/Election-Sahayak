import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { getStates, getDistricts, getConstituencies } from '../../utils/geography';

const Step3_Location = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [useGPS, setUseGPS] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState({
    state: '',
    district: '',
    constituency: ''
  });

  const [data, setData] = useState({
    states: getStates(),
    districts: [],
    constituencies: []
  });

  useEffect(() => {
    if (selection.state) {
      setData(prev => ({ ...prev, districts: getDistricts(selection.state), constituencies: [] }));
    }
  }, [selection.state]);

  useEffect(() => {
    if (selection.district) {
      setData(prev => ({ ...prev, constituencies: getConstituencies(selection.state, selection.district) }));
    }
  }, [selection.district]);

  const handleGPS = () => {
    setLoading(true);
    setTimeout(() => {
      const mockLocation = { state: 'Delhi', constituency: 'New Delhi' };
      localStorage.setItem('electionSahayakLocation', JSON.stringify(mockLocation));
      setLoading(false);
      navigate('/step4');
    }, 2000);
  };

  const handleManualSubmit = () => {
    if (selection.constituency) {
      localStorage.setItem('electionSahayakLocation', JSON.stringify({
        state: selection.state,
        constituency: selection.constituency
      }));
      navigate('/step4');
    }
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-right-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 text-center text-navyblue-600 dark:text-navyblue-400">{t.location_title}</h2>
      
      {useGPS ? (
        <div className="w-full flex flex-col items-center">
          <p className="text-slate-600 dark:text-slate-300 mb-8 text-center">{t.location_desc}</p>
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-medium mb-4 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            onClick={handleGPS}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2"><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> {t.getting_location}</span>
            ) : (
              <>{t.share_location}</>
            )}
          </button>
          <button 
            className="text-blue-600 font-medium hover:underline"
            onClick={() => setUseGPS(false)}
          >
            {t.select_manually}
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4">
          <select 
            className="w-full p-4 rounded-xl glass-panel bg-transparent outline-none border-navyblue-200"
            value={selection.state}
            onChange={(e) => setSelection({ ...selection, state: e.target.value, district: '', constituency: '' })}
          >
            <option value="">{t.select_state}</option>
            {data.states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            className="w-full p-4 rounded-xl glass-panel bg-transparent outline-none border-navyblue-200 disabled:opacity-50"
            disabled={!selection.state}
            value={selection.district}
            onChange={(e) => setSelection({ ...selection, district: e.target.value, constituency: '' })}
          >
            <option value="">{t.select_district}</option>
            {data.districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select 
            className="w-full p-4 rounded-xl glass-panel bg-transparent outline-none border-navyblue-200 disabled:opacity-50"
            disabled={!selection.district}
            value={selection.constituency}
            onChange={(e) => setSelection({ ...selection, constituency: e.target.value })}
          >
            <option value="">{t.select_constituency}</option>
            {data.constituencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button 
            className="w-full bg-saffron-500 hover:bg-saffron-600 text-white py-4 rounded-xl text-lg font-medium mt-4 disabled:opacity-50 shadow-lg shadow-saffron-500/30"
            disabled={!selection.constituency}
            onClick={handleManualSubmit}
          >
            {t.continue}
          </button>

          <button 
            className="text-slate-500 text-sm mt-2 hover:underline"
            onClick={() => setUseGPS(true)}
          >
            {t.back_to_gps}
          </button>
        </div>
      )}
    </div>
  );
};

export default Step3_Location;
