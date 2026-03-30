import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ChevronLeft, Bus, Navigation2, Clock, Phone, User, MessageCircle, MoreVertical, MapPin, Search } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

// Fix leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom animated bus icon
const createBusIcon = (heading) => {
  return L.divIcon({
    className: 'custom-bus-icon',
    html: `
      <div style="transform: rotate(${heading}deg); transition: transform 0.5s ease;">
        <div class="relative flex items-center justify-center">
          <div class="absolute w-12 h-12 bg-[#0B3D91]/20 rounded-full animate-ping"></div>
          <div class="w-10 h-10 bg-[#0B3D91] rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1 1-2V7s0-1-1-1h-3"/><path d="M3 18h3s1-1 1-2V7s0-1-1-1H3s-1 0-1 1v9s0 2 1 2Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>
          </div>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

export default function LiveTracking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [position, setPosition] = useState([9.5624, 44.0770]); // Hargeisa position
  const [heading, setHeading] = useState(45);
  const [isPanelOpen, setIsPanelOpen ] = useState(true);

  // Simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => [prev[0] + 0.001, prev[1] + 0.001]);
      setHeading(prev => (prev + 5) % 360);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const routePath = [
    [9.5624, 44.0770],
    [9.5700, 44.0900],
    [9.5800, 44.1100],
    [10.4396, 45.0354], // Berbera end
  ];

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gray-100">
      {/* Map Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-[1000] flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => navigate(-1)} 
          className="w-12 h-12 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-4 border-navy-50 pointer-events-auto active:scale-95 transition-all text-[#0B3D91]"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <div className="flex items-center gap-3 bg-white/40 backdrop-blur-xl px-6 py-4 rounded-[32px] border-2 border-white/50 shadow-2xl pointer-events-auto">
           <div className="w-10 h-10 bg-[#17A2A9] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-900/10">
             <Navigation2 size={20} className="fill-white" />
           </div>
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-[#0B3D91] uppercase tracking-[0.2em] leading-none mb-1">Status</span>
              <span className="text-xs font-black text-navy-900 tracking-tight">EN ROUTE</span>
           </div>
        </div>
        <button className="w-12 h-12 bg-white rounded-3xl shadow-2xl flex items-center justify-center border-4 border-navy-50 pointer-events-auto text-gray-400">
           <MoreVertical size={20} />
        </button>
      </div>

      {/* Full Screen Map */}
      <MapContainer 
        center={position} 
        zoom={13} 
        zoomControl={false}
        className="h-full w-full z-10"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polyline 
           positions={routePath} 
           color="#17A2A9" 
           weight={6} 
           opacity={0.3} 
           dashArray="10, 15"
        />
        <Marker position={position} icon={createBusIcon(heading)}>
          <Popup className="custom-popup">
            <div className="p-3 text-center">
              <p className="font-extrabold text-navy-900 text-sm">MT-V914</p>
              <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest mt-0.5">Moving at 60km/h</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Floating Info Panel */}
      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: isPanelOpen ? 0 : 'calc(100% - 100px)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        className="absolute bottom-0 left-0 right-0 z-[1000] px-6 pb-6 pointer-events-none"
      >
        <div className="bg-white rounded-[40px] shadow-2xl shadow-navy-900/10 border-4 border-gray-50 flex flex-col p-8 pointer-events-auto relative">
           {/* Handle */}
           <button 
             onClick={() => setIsPanelOpen(!isPanelOpen)}
             className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gray-100 rounded-full"
           ></button>

           <div className="flex justify-between items-start mb-8 pt-2">
             <div className="flex flex-col gap-1">
               <h2 className="text-2xl font-black text-navy-900 flex items-center gap-3">
                 Hargeisa <ChevronLeft size={16} className="rotate-180 text-gray-200" /> Berbera
               </h2>
               <div className="flex items-center gap-2">
                 <div className="px-2 py-0.5 bg-teal-50 text-teal-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Premium VIP</div>
                 <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Tomorrow · 08:00 AM</div>
               </div>
             </div>
             <div className="flex flex-col items-end gap-1.5">
               <div className="flex items-center gap-2 p-2 px-4 bg-navy-50 rounded-2xl border-2 border-white shadow-sm">
                  <Clock size={16} className="text-navy-900" />
                  <span className="text-sm font-black text-navy-900 tracking-tight">12 Mins Away</span>
               </div>
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Estimated Arrival</p>
             </div>
           </div>

           <div className="flex items-center justify-between pt-8 border-t border-gray-100 relative">
             <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-[28px] bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] flex items-center justify-center text-white text-2xl font-black ring-4 ring-navy-50">
                    DH
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black text-navy-900 leading-none mb-1">Dahir Hassan</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Driver</span>
                  </div>
                </div>
             </div>

             <div className="flex gap-3">
               <button className="w-14 h-14 bg-white border-4 border-gray-50 rounded-[24px] flex items-center justify-center text-gray-400 hover:text-navy-900 shadow-sm transition-all active:scale-95">
                 <MessageCircle size={24} />
               </button>
               <button className="w-14 h-14 bg-[#0B3D91] rounded-[24px] flex items-center justify-center text-white shadow-xl shadow-navy-100 transition-all active:scale-95">
                 <Phone size={24} />
               </button>
             </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}