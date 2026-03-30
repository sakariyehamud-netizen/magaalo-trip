import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, Navigation2, Search, Filter, MoreVertical, Truck, User, ChevronRight, Activity, Zap, Compass, Info, X } from 'lucide-react';

// Custom bus icon for admin
const createFleetBusIcon = (heading, color) => {
  return L.divIcon({
    className: 'custom-fleet-bus-icon',
    html: `
      <div style="transform: rotate(${heading}deg); transition: transform 1s ease;">
        <div class="relative flex items-center justify-center">
          <div class="absolute w-12 h-12 bg-${color}-500/10 rounded-full animate-ping"></div>
          <div class="w-10 h-10 bg-${color === 'teal' ? '#17A2A9' : '#0B3D91'} rounded-2xl border-4 border-white shadow-2xl flex items-center justify-center text-white ring-2 ring-${color}-50 transform hover:scale-125 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1 1-2V7s0-1-1-1h-3"/><path d="M3 18h3s1-1 1-2V7s0-1-1-1H3s-1 0-1 1v9s0 2 1 2Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
          </div>
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-white border-2 border-${color === 'teal' ? 'teal' : 'indigo'}-500 rounded-full flex items-center justify-center shadow-lg">
            <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

const FLEET_BUSES = [
  { id: 1, pos: [9.5624, 44.0770], route: 'Hargeisa → Berbera', driver: 'Dahir Hassan', speed: '62km/h', status: 'On Time', color: 'teal', heading: 45 },
  { id: 2, pos: [9.5700, 44.0850], route: 'Hargeisa → Borama', driver: 'Nimco Ali', speed: '45km/h', status: 'Slow', color: 'indigo', heading: -30 },
  { id: 3, pos: [9.5550, 44.0650], route: 'Mogadishu → Baidoa', driver: 'Abdi Bile', speed: '58km/h', status: 'On Time', color: 'teal', heading: 120 },
];

export default function AdminTracking() {
  const [buses, setBuses] = useState(FLEET_BUSES);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses(prev => prev.map(bus => ({
        ...bus,
        pos: [bus.pos[0] + (Math.random() - 0.5) * 0.001, bus.pos[1] + (Math.random() - 0.5) * 0.001],
        heading: (bus.heading + (Math.random() - 0.5) * 10) % 360,
        speed: `${Math.floor(55 + Math.random() * 10)}km/h`
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-160px)] w-full rounded-[60px] overflow-hidden shadow-2xl shadow-gray-200 border-8 border-white relative bg-gray-50">
      {/* Map Control Overlay */}
      <div className="absolute top-8 left-8 z-[1000] flex flex-col gap-4 pointer-events-none">
         <div className="bg-white/40 backdrop-blur-2xl px-8 py-5 rounded-[40px] shadow-2xl border-4 border-white flex items-center gap-6 pointer-events-auto group cursor-default">
            <div className="w-14 h-14 rounded-3xl bg-navy-900 border-4 border-navy-800 flex items-center justify-center text-[#17A2A9] shadow-xl group-hover:rotate-12 transition-all">
               <Activity size={28} strokeWidth={3} className="animate-pulse" />
            </div>
            <div className="flex flex-col gap-1 items-start leading-none">
               <span className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.4em] leading-none mb-1">Global Traffic Feed</span>
               <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-navy-900 tracking-tighter">{buses.length} Active Nodes</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-teal-100 shadow-sm animate-bounce">
                    <Zap size={10} fill="currentColor" /> Live
                  </div>
               </div>
            </div>
         </div>

         <div className="relative group min-w-[320px] pointer-events-auto">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2A9] transition-colors">
               <Search size={18} strokeWidth={3} />
            </div>
            <input 
              type="text" 
              placeholder="Locate specific Bus ID..." 
              className="w-full pl-14 pr-6 py-4 bg-white/60 backdrop-blur-xl border-4 border-white/40 rounded-[28px] text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-2xl"
            />
         </div>
      </div>

      <div className="absolute top-8 right-8 z-[1000] pointer-events-none">
         <div className="bg-white p-2 rounded-[32px] shadow-2xl border-4 border-white flex flex-col gap-2 pointer-events-auto">
            <button className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center text-navy-900 border-2 border-white shadow-inner hover:bg-white transition-all active:scale-95"><Filter size={20} strokeWidth={3} /></button>
            <button className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center text-navy-900 border-2 border-white shadow-inner hover:bg-white transition-all active:scale-95"><Compass size={20} strokeWidth={3} /></button>
            <div className="w-12 h-0.5 bg-gray-50 rounded-full my-1"></div>
            <button className="w-12 h-12 bg-navy-900 rounded-2xl flex items-center justify-center text-white border-4 border-navy-800 shadow-xl hover:rotate-6 transition-all active:scale-90"><Navigation2 size={20} strokeWidth={3} /></button>
         </div>
      </div>

      <MapContainer 
        center={[9.5624, 44.0770]} 
        zoom={13} 
        zoomControl={false}
        className="h-full w-full z-10"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="bottomright" />
        
        {buses.map((bus) => (
          <Marker 
            key={bus.id} 
            position={bus.pos} 
            icon={createFleetBusIcon(bus.heading, bus.color)}
            eventHandlers={{ 
              click: () => setSelectedBus(bus) 
            }}
          >
            <Popup className="custom-admin-popup">
              <div className="p-4 flex flex-col gap-4 text-center items-center min-w-[200px]">
                 <div className={`w-14 h-14 rounded-2xl bg-${bus.color}-50 flex items-center justify-center text-${bus.color === 'teal' ? 'teal-600' : 'indigo-500'} border-4 border-white shadow-xl ring-2 ring-${bus.color}-100`}>
                   <Truck size={24} strokeWidth={3} />
                 </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-xl font-black text-navy-900 tracking-tighter leading-none">{bus.route}</span>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mt-1">Bus ID · MT-V{bus.id}V914</span>
                 </div>
                 <div className="w-full flex justify-between items-center bg-gray-50/50 p-4 rounded-3xl border-2 border-white shadow-inner-lg mt-2 group cursor-pointer hover:bg-white hover:border-[#F6F8FA] transition-all">
                    <div className="flex flex-col items-start gap-0.5">
                       <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">Vehicle Pilot</span>
                       <span className="text-sm font-black text-navy-900 leading-none group-hover:text-[#17A2A9] transition-colors">{bus.driver}</span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                       <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">Status Feed</span>
                       <span className="text-xs font-black text-teal-600 leading-none flex items-center gap-1 group-hover:animate-bounce">
                          <Activity size={10} strokeWidth={4} /> {bus.status}
                       </span>
                    </div>
                 </div>
                 <button className="w-full py-4 bg-navy-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-navy-200 active:scale-95 transition-all outline-none">Control Telemetry</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Global Stats Footer HUD */}
      <div className="absolute bottom-8 left-8 right-8 z-[1000] pointer-events-none">
         <div className="bg-white/60 backdrop-blur-2xl p-4 rounded-[48px] shadow-2xl border-4 border-white/50 flex flex-wrap justify-center items-center gap-8 pointer-events-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-navy-900/5 pointer-events-none group-hover:from-teal-500/10 group-hover:to-navy-900/10 transition-all duration-1000"></div>
            {[
              { label: 'Network Health', val: '99.2%', color: 'text-green-500' },
              { label: 'Average Velocity', val: '64 km/h', color: 'text-[#17A2A9]' },
              { label: 'Active Personnel', val: '12 Operators', color: 'text-indigo-500' },
              { label: 'Critical Errors', val: '00 Detected', color: 'text-rose-500' },
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-4 px-6 border-r border-gray-100 last:border-0 relative z-10 group/stat">
                 <div className={`w-3 h-3 rounded-full ${stat.color} bg-current group-hover/stat:animate-ping opacity-30`}></div>
                 <div className="flex flex-col items-start min-w-[100px]">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">{stat.label}</span>
                    <span className="text-base font-black text-navy-900 tracking-tighter leading-none group-hover/stat:translate-x-1 transition-transform">{stat.val}</span>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}