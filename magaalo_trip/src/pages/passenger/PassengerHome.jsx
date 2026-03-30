import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bus, Bell, MapPin, Calendar, Users, ArrowRightLeft, Search, Ticket as TicketIcon, X, Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AVAILABLE_CITIES = [
  'Hargeisa', 'Berbera', 'Borama', 'Burao', 'Gabiley', 
  'Erigavo', 'Las Anod', 'Garowe', 'Bossaso', 'Galkayo', 
  'Mogadishu', 'Baidoa'
];

const POPULAR_ROUTES = [
  { id: 1, from: 'Hargeisa', to: 'Berbera', duration: '3h 30m', price: 15 },
  { id: 2, from: 'Garowe', to: 'Bossaso', duration: '4h 15m', price: 20 },
  { id: 3, from: 'Mogadishu', to: 'Baidoa', duration: '5h 00m', price: 25 },
];

export default function PassengerHome() {
  const [fromCity, setFromCity] = useState('Hargeisa');
  const [toCity, setToCity] = useState('Berbera');
  const [selectorConfig, setSelectorConfig] = useState(null); // { type: 'from' | 'to' }

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleCitySelect = (city) => {
    if (selectorConfig?.type === 'from') setFromCity(city);
    else setToCity(city);
    setSelectorConfig(null);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Hero Header */}
      <div className="brand-gradient pt-12 pb-24 px-6 rounded-b-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
              <Bus className="text-white" size={28} />
            </div>
            <div>
              <p className="text-white/70 text-sm font-medium">Welcome to</p>
              <h1 className="text-white text-2xl font-extrabold tracking-tight">Magaalo Trip</h1>
            </div>
          </div>
          <button className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 relative">
            <Bell className="text-white" size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-teal-400 rounded-full border-2 border-[#0B3D91]"></span>
          </button>
        </div>
      </div>

      {/* Search Form Card */}
      <div className="px-6 -mt-16 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-8 space-y-6 border border-white"
        >
          <div className="relative space-y-3">
            <button 
              onClick={() => setSelectorConfig({ type: 'from' })}
              className="w-full flex items-center gap-5 p-5 bg-[#F6F8FA] rounded-[28px] border-2 border-transparent hover:border-indigo-100 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-navy-900 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                <MapPin size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest leading-none mb-1">Departure City</p>
                <p className="text-base font-black text-navy-900 tracking-tighter">{fromCity}</p>
              </div>
            </button>
            
            <button 
              onClick={swapCities}
              className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-2xl border-4 border-gray-50 rounded-full flex items-center justify-center z-10 hover:rotate-180 transition-transform duration-500 active:scale-90"
            >
              <ArrowRightLeft className="text-teal-900 rotate-90" size={20} strokeWidth={3} />
            </button>

            <button 
              onClick={() => setSelectorConfig({ type: 'to' })}
              className="w-full flex items-center gap-5 p-5 bg-[#F6F8FA] rounded-[28px] border-2 border-transparent hover:border-teal-100 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-teal-900 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-500">
                <MapPin size={22} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest leading-none mb-1">Arrival City</p>
                <p className="text-base font-black text-navy-900 tracking-tighter">{toCity}</p>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 bg-[#F6F8FA] rounded-[28px]">
              <Calendar className="text-gray-300 shrink-0" size={20} />
              <div>
                <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest leading-none mb-1">Voyage Date</p>
                <p className="text-sm font-black text-navy-900 tracking-tighter">24 Oct, 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-[#F6F8FA] rounded-[28px]">
              <Users className="text-gray-300 shrink-0" size={20} />
              <div>
                <p className="text-[9px] text-gray-300 font-black uppercase tracking-widest leading-none mb-1">Manifest</p>
                <p className="text-sm font-black text-navy-900 tracking-tighter">1 Adult</p>
              </div>
            </div>
          </div>

          <Link to="/passenger/search" className="w-full brand-gradient py-6 rounded-[32px] text-white font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 shadow-2xl shadow-navy-900/10 active:scale-[0.98] transition-all mt-4">
            <Search size={20} strokeWidth={3} />
            Find Best Voyage
          </Link>
        </motion.div>
      </div>

      {/* Popular Routes */}
      <div className="mt-10">
        <div className="px-6 flex justify-between items-end mb-4">
          <h2 className="text-xl font-extrabold text-navy-900 tracking-tight">Popular Routes</h2>
          <button className="text-teal-900 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
            Explore All
          </button>
        </div>
        
        <div className="flex overflow-x-auto overflow-y-hidden gap-6 px-6 pb-6 no-scrollbar">
          {POPULAR_ROUTES.map((route) => (
            <motion.div 
              key={route.id}
              whileHover={{ y: -5 }}
              className="min-w-[260px] bg-white p-6 rounded-[38px] shadow-xl shadow-gray-100 border border-gray-50 flex flex-col gap-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -mr-12 -mt-12 opacity-40 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-black text-navy-900 tracking-tighter">{route.from}</span>
                  <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest">To Terminal</span>
                  <span className="text-xl font-black text-navy-900 tracking-tighter">{route.to}</span>
                </div>
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                  <Bus size={22} className="text-teal-600" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 relative z-10">
                <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{route.duration}</span>
                </div>
                <span className="text-2xl font-black text-navy-900 tracking-tighter">${route.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="mt-6 px-6 pb-24">
        <h2 className="text-xl font-extrabold text-navy-900 tracking-tight mb-4">Upcoming Trips</h2>
        <div className="bg-white p-12 rounded-[50px] border-4 border-dashed border-gray-50 flex flex-col items-center justify-center text-center gap-4 active:scale-95 transition-all cursor-pointer">
          <div className="w-20 h-20 bg-[#F6F8FA] rounded-[32px] flex items-center justify-center mb-1 shadow-inner border-2 border-white text-gray-200">
            <TicketIcon size={36} strokeWidth={1} />
          </div>
          <div className="space-y-1">
             <p className="text-navy-900 font-black tracking-tight text-lg leading-none">No active manifest</p>
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Secure your next voyage today</p>
          </div>
        </div>
      </div>

      {/* Terminal Selector Modal */}
      <AnimatePresence>
         {selectorConfig && (
           <div className="fixed inset-0 z-[5000] flex flex-col">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectorConfig(null)}
                className="absolute inset-0 bg-navy-900/60 backdrop-blur-xl"
              />
              
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="mt-auto bg-white rounded-t-[60px] p-10 relative z-10 max-h-[85vh] overflow-y-auto w-full border-t-8 border-white"
              >
                 <div className="flex justify-between items-start mb-12">
                    <div className="space-y-2">
                       <h3 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">
                          {selectorConfig.type === 'from' ? 'Departure Area' : 'Destination Area'}
                       </h3>
                       <p className="text-[10px] text-gray-300 font-black uppercase tracking-[0.5em]">Terminal Search Protocol</p>
                    </div>
                    <button 
                      onClick={() => setSelectorConfig(null)}
                      className="w-14 h-14 bg-[#F6F8FA] rounded-[24px] flex items-center justify-center text-navy-900 border-2 border-white shadow-xl active:scale-90 transition-all"
                    >
                       <X size={24} strokeWidth={3} />
                    </button>
                 </div>

                 <div className="relative mb-12 group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors">
                       <Search size={22} strokeWidth={3} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search regional terminals..." 
                      className="w-full pl-16 pr-6 py-6 bg-[#F6F8FA] border-2 border-transparent rounded-[32px] text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-teal-500/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                    />
                 </div>

                 <div className="space-y-12">
                    {/* Recently Visited */}
                    <div className="space-y-6">
                       <h4 className="text-[10px] text-gray-300 font-black uppercase tracking-[0.4em] px-2">History Logs</h4>
                       <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-1">
                          {['Hargeisa', 'Berbera', 'Mogadishu'].map(city => (
                            <button 
                              key={city}
                              onClick={() => handleCitySelect(city)}
                              className="px-8 py-4 bg-white border-2 border-gray-50 rounded-[24px] text-sm font-black text-navy-900 shadow-sm flex items-center gap-3 active:scale-95 transition-all whitespace-nowrap"
                            >
                               <Clock size={14} className="text-teal-500" />
                               {city}
                            </button>
                          ))}
                       </div>
                    </div>

                    {/* All Terminals */}
                    <div className="space-y-6 pb-20">
                       <h4 className="text-[10px] text-gray-300 font-black uppercase tracking-[0.4em] px-2">Regional Grid</h4>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {AVAILABLE_CITIES.map(city => {
                            const isSelected = selectorConfig.type === 'from' ? fromCity === city : toCity === city;
                            return (
                              <button 
                                key={city}
                                onClick={() => handleCitySelect(city)}
                                className={`flex items-center justify-between p-6 rounded-[32px] transition-all border-4 ${isSelected ? 'bg-navy-900 border-navy-800 text-white shadow-2xl' : 'bg-[#F6F8FA] border-white text-navy-900 hover:bg-white hover:border-gray-50 hover:shadow-xl group'}`}
                              >
                                 <div className="flex items-center gap-6">
                                    <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center ${isSelected ? 'bg-teal-400 text-navy-900' : 'bg-white text-gray-300 group-hover:text-teal-500 transition-colors'}`}>
                                       <MapPin size={22} strokeWidth={isSelected ? 4 : 2.5} />
                                    </div>
                                    <span className="text-lg font-black tracking-tighter capitalize">{city}</span>
                                 </div>
                                 {isSelected && <Check size={20} strokeWidth={4} className="text-teal-400" />}
                              </button>
                            );
                          })}
                       </div>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}