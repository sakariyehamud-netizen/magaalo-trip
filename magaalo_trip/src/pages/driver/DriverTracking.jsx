import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ChevronLeft, Navigation2, Clock, MapPin, Search, Compass, Truck, Fuel, Thermometer, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const createDriverIcon = (heading) => {
  return L.divIcon({
    className: 'custom-driver-icon',
    html: `
      <div style="transform: rotate(${heading}deg); transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);">
        <div class="relative flex items-center justify-center">
          <div class="absolute w-16 h-16 bg-[#0B3D91]/20 rounded-full animate-pulse"></div>
          <div class="w-12 h-12 bg-[#0B3D91] rounded-[24px] border-4 border-white shadow-2xl flex items-center justify-center text-white ring-4 ring-navy-50">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="m20 10-8-8-8 8"/><path d="m20 14-8 8-8-8"/></svg>
          </div>
        </div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24]
  });
};

export default function DriverTracking() {
  const navigate = useNavigate();
  const [position, setPosition] = useState([9.5624, 44.0770]);
  const [heading, setHeading] = useState(90);
  const [speed, setSpeed] = useState(62);
  const [isStatsOpen, setIsStatsOpen] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => [prev[0] + 0.001, prev[1] + 0.001]);
      setHeading(prev => (prev + 2) % 360);
      setSpeed(prev => Math.floor(60 + Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const routePath = [
    [9.5624, 44.0770],
    [9.5700, 44.0900],
    [9.5800, 44.1100],
    [10.4396, 45.0354],
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gray-100">
      {/* HUD Header */}
      <div className="absolute top-0 left-0 right-0 p-8 z-[1000] flex justify-between items-start pointer-events-none">
         <button 
           onClick={() => navigate(-1)}
           className="w-16 h-16 bg-white/40 backdrop-blur-2xl rounded-[32px] shadow-2xl flex items-center justify-center text-navy-900 border-4 border-white pointer-events-auto active:scale-95 transition-all"
         >
           <ChevronLeft size={32} strokeWidth={4} />
         </button>

         <div className="flex flex-col gap-3 pointer-events-auto">
            <div className="bg-navy-900/90 backdrop-blur-xl px-8 py-5 rounded-[40px] shadow-2xl border-4 border-navy-800 flex items-center gap-6 text-white group cursor-pointer hover:bg-navy-800 transition-all">
               <div className="flex flex-col items-start leading-none gap-1">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Current Heading</span>
                  <span className="text-2xl font-black">{heading}° Eastbound</span>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#17A2A9] shadow-inner group-hover:rotate-45 transition-all">
                  <Compass size={28} strokeWidth={3} className="animate-spin-slow" />
               </div>
            </div>
         </div>
      </div>

      <MapContainer 
        center={position} 
        zoom={14} 
        zoomControl={false}
        className="h-full w-full grayscale-[0.2]"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline positions={routePath} color="#17A2A9" weight={8} opacity={0.2} dashArray="20, 20" />
        <Marker position={position} icon={createDriverIcon(heading)} />
      </MapContainer>

      {/* Telemetry Panel */}
      <motion.div 
        animate={{ y: isStatsOpen ? 0 : 'calc(100% - 100px)' }}
        className="absolute bottom-0 left-0 right-0 z-[1000] px-8 pb-10 pointer-events-none"
      >
        <div className="bg-white rounded-[56px] shadow-2xl shadow-navy-900/10 border-4 border-gray-50 flex flex-col p-10 pointer-events-auto relative overflow-hidden max-w-2xl mx-auto">
           {/* Handle */}
           <button 
             onClick={() => setIsStatsOpen(!isStatsOpen)}
             className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-2 bg-gray-100 rounded-full"
           ></button>

           <div className="grid grid-cols-2 gap-10 pt-4">
              <div className="flex items-center gap-6">
                 <div className="w-24 h-24 rounded-[40px] bg-[#F6F8FA] border-4 border-white shadow-xl flex flex-col items-center justify-center gap-1 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-teal-500/5 group-hover:bg-teal-500/10 transition-colors"></div>
                    <span className="text-4xl font-black text-navy-900 leading-none relative z-10">{speed}</span>
                    <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest relative z-10 leading-none">KM/H</span>
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Cruising Speed</span>
                    <h4 className="text-xl font-black text-navy-900 leading-none">Safe Mode</h4>
                    <div className="flex items-center gap-2 mt-1">
                       <ShieldCheck size={14} className="text-teal-500" />
                       <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest leading-none">GPS Locked</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-6 justify-center pl-8 border-l border-gray-50">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shadow-sm border border-white">
                       <Clock size={20} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 text-[9px]">ETA Berbera</span>
                       <span className="text-sm font-black text-navy-900 tracking-tight leading-none">42 Mins</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shadow-sm border border-white">
                       <Fuel size={20} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 text-[9px]">Fuel Level</span>
                       <span className="text-sm font-black text-navy-900 tracking-tight leading-none">75% (Full)</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="mt-10 pt-10 border-t border-gray-50 flex justify-between items-center group">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] rounded-2xl flex items-center justify-center text-white shadow-xl ring-4 ring-navy-50 group-hover:rotate-6 transition-all duration-300">
                    <Truck size={24} strokeWidth={3} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-lg font-black text-navy-900 leading-none mb-1 uppercase tracking-tighter tracking-widest text-[11px]">Bus MT-V0914</span>
                    <span className="text-lg font-black text-[#17A2A9] leading-none mb-1 uppercase tracking-tighter">Premium VIP Bus</span>
                 </div>
              </div>
              <div className="flex flex-col items-end">
                 <div className="flex items-center gap-3 p-4 px-6 bg-[#0B3D91] text-white rounded-[28px] shadow-2xl shadow-navy-900/20 active:scale-95 transition-all">
                    <Navigation2 size={20} strokeWidth={3} className="fill-white" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] leading-none">NAVIGATE</span>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}