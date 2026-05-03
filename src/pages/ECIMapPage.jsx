import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Info, X, Users, Landmark, ChevronRight, ExternalLink } from 'lucide-react';

// Fix Leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const STATE_DATA = [
  { name: "Delhi", lat: 28.6139, lng: 77.2090, type: "UT", capital: "New Delhi", ls: 7, rs: 3, assembly: 70, voters: "1.47 Cr", zone: "North" },
  { name: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, type: "State", capital: "Lucknow", ls: 80, rs: 31, assembly: 403, voters: "15.02 Cr", zone: "North" },
  { name: "Maharashtra", lat: 18.9750, lng: 72.8258, type: "State", capital: "Mumbai", ls: 48, rs: 19, assembly: 288, voters: "9.12 Cr", zone: "West" },
  { name: "West Bengal", lat: 22.5726, lng: 88.3639, type: "State", capital: "Kolkata", ls: 42, rs: 16, assembly: 294, voters: "7.52 Cr", zone: "East" },
  { name: "Tamil Nadu", lat: 13.0827, lng: 80.2707, type: "State", capital: "Chennai", ls: 39, rs: 18, assembly: 234, voters: "6.23 Cr", zone: "South" },
  { name: "Karnataka", lat: 12.9716, lng: 77.5946, type: "State", capital: "Bengaluru", ls: 28, rs: 12, assembly: 224, voters: "5.37 Cr", zone: "South" },
  { name: "Gujarat", lat: 23.2156, lng: 72.6369, type: "State", capital: "Gandhinagar", ls: 26, rs: 11, assembly: 182, voters: "4.91 Cr", zone: "West" },
  { name: "Rajasthan", lat: 26.9124, lng: 75.7873, type: "State", capital: "Jaipur", ls: 25, rs: 10, assembly: 200, voters: "5.27 Cr", zone: "North" },
  { name: "Bihar", lat: 25.5941, lng: 85.1376, type: "State", capital: "Patna", ls: 40, rs: 16, assembly: 243, voters: "7.64 Cr", zone: "East" },
  { name: "Nagaland", lat: 25.6751, lng: 94.1086, type: "State", capital: "Kohima", ls: 1, rs: 1, assembly: 60, voters: "0.13 Cr", zone: "Northeast" }
];

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
};

export default function ECIMapPage() {
  const [selectedState, setSelectedState] = useState(null);
  const [filter, setFilter] = useState('All');

  const filteredStates = filter === 'All' 
    ? STATE_DATA 
    : STATE_DATA.filter(s => s.zone === filter);

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-saffron-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-saffron-500/20">
            <Globe size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Interactive Election Map</h1>
            <p className="text-slate-500 font-medium text-xs">Explore Lok Sabha seats and voter data across India</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          {['All', 'North', 'South', 'East', 'West', 'Northeast'].map(z => (
            <button 
              key={z}
              onClick={() => setFilter(z)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === z ? 'bg-saffron-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
            >
              {z}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[600px]">
        {/* Map Column */}
        <div className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden relative">
          <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapResizer />
            {filteredStates.map((state) => (
              <Marker 
                key={state.name} 
                position={[state.lat, state.lng]}
                eventHandlers={{
                  click: () => setSelectedState(state),
                }}
              >
                <Popup>
                  <div className="p-1">
                    <p className="font-black text-slate-900 m-0 text-sm">{state.name}</p>
                    <p className="text-[10px] font-bold text-saffron-600 m-0 uppercase tracking-widest">LS: {state.ls} Seats</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl border border-slate-200 shadow-lg">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors border-b border-slate-100" onClick={() => document.querySelector('.leaflet-container')._leaflet_map.zoomIn()}>+</button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => document.querySelector('.leaflet-container')._leaflet_map.zoomOut()}>-</button>
            </div>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="lg:col-span-1 space-y-6">
          <AnimatePresence mode="wait">
            {selectedState ? (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full"
              >
                <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 leading-tight">{selectedState.name}</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Capital: {selectedState.capital}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedState(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
                    <X size={18} />
                  </button>
                </div>
                
                <div className="p-6 flex-1 space-y-5">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Landmark className="text-saffron-500" size={18} />
                      <span className="text-xs font-bold text-slate-600">Lok Sabha Seats</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{selectedState.ls}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Landmark className="text-blue-500" size={18} />
                      <span className="text-xs font-bold text-slate-600">Rajya Sabha Seats</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{selectedState.rs}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Users className="text-indiagreen-500" size={18} />
                      <span className="text-xs font-bold text-slate-600">Assembly Seats</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{selectedState.assembly}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Users className="text-purple-500" size={18} />
                      <span className="text-xs font-bold text-slate-600">Total Voters</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{selectedState.voters}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <Globe className="text-orange-500" size={18} />
                      <span className="text-xs font-bold text-slate-600">Zone</span>
                    </div>
                    <span className="text-sm font-black text-slate-900">{selectedState.zone}</span>
                  </div>
                </div>

                <div className="p-6 mt-auto">
                  <a 
                    href="https://www.eci.gov.in" 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-saffron-600 hover:bg-saffron-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-saffron-600/20 transition-all"
                  >
                    View on ECI <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center h-full space-y-4"
              >
                <div className="w-16 h-16 bg-saffron-50 text-saffron-500 rounded-full flex items-center justify-center animate-bounce">
                  <MapPin size={32} />
                </div>
                <h3 className="text-lg font-black text-slate-900">Select a State on the Map</h3>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Click on any marker on the map to view detailed electoral information including Lok Sabha seats, Rajya Sabha representation, and voter statistics.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Links Card */}
          <div className="bg-white rounded-[2rem] shadow-lg border border-slate-100 p-6 space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: 'Voter Registration Portal', url: 'https://voters.eci.gov.in/' },
                { label: 'Find Your Booth', url: 'https://electoralsearch.eci.gov.in/' },
                { label: 'Recognised Parties', url: 'https://www.eci.gov.in/recognised-political-parties' },
                { label: 'Election Results', url: 'https://results.eci.gov.in/' }
              ].map(link => (
                <a 
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-all group"
                >
                  <span className="text-[10px] font-black text-slate-700">{link.label}</span>
                  <ExternalLink size={12} className="text-slate-300 group-hover:text-saffron-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
