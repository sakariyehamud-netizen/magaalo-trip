import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Filter, Star, Clock, Bus, MapPin, Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_TRIPS = [
  { id: 1, from: 'Hargeisa', to: 'Berbera', depTime: '08:00 AM', arrTime: '11:30 AM', price: 15, rating: 4.8, seats: 5, busType: 'VIP Platinum', busNo: 'MT-001X', wifi: true, ac: true },
  { id: 2, from: 'Hargeisa', to: 'Berbera', depTime: '10:30 AM', arrTime: '02:00 PM', price: 12, rating: 4.5, seats: 12, busType: 'Executive', busNo: 'MT-204B', wifi: true, ac: true },
  { id: 3, from: 'Hargeisa', to: 'Berbera', depTime: '02:00 PM', arrTime: '05:30 PM', price: 15, rating: 4.9, seats: 3, busType: 'VIP Platinum', busNo: 'MT-112X', wifi: true, ac: true },
  { id: 4, from: 'Hargeisa', to: 'Berbera', depTime: '04:30 PM', arrTime: '08:00 PM', price: 10, rating: 4.2, seats: 8, busType: 'Standard', busNo: 'MT-305S', wifi: false, ac: true },
];

const FILTERS = ['All Voyages', 'Morning', 'Afternoon', 'Evening'];

export default function BusList() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Voyages');

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-28">
      {/* Premium Search Header */}
      <div className="bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] px-8 pt-16 pb-12 rounded-b-[60px] text-white overflow-hidden relative shadow-2xl shadow-indigo-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl -mb-24 -ml-12" />

        <div className="flex justify-between items-center mb-10 relative z-10">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)} 
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-[28px] flex items-center justify-center border-2 border-white/20 shadow-xl active:scale-95 transition-all text-white hover:bg-white/20"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <div className="flex flex-col">
                 <h1 className="text-3xl font-black text-white tracking-tighter leading-none flex items-center gap-4">
                    Hargeisa 
                    <ArrowRight size={20} className="text-teal-400" />
                    Berbera
                 </h1>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mt-2">Voyage Schedule · MT-0914</p>
              </div>
           </div>
           
           <button className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-[24px] flex items-center justify-center border border-white/20 shadow-xl text-white active:scale-95 transition-all">
              <SlidersHorizontal size={22} strokeWidth={2.5} />
           </button>
        </div>

        {/* Tactical Filter Chips */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 relative z-10">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                activeFilter === filter 
                ? 'bg-white text-navy-900 border-white shadow-2xl' 
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Voyage Manifest List */}
      <div className="px-8 -mt-6 space-y-6 relative z-20">
        {MOCK_TRIPS.map((trip, idx) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              to={`/passenger/seat-selection/${trip.id}`} 
              className="block bg-white p-8 rounded-[48px] shadow-2xl shadow-gray-200/40 hover:shadow-gray-200 border-4 border-white hover:border-gray-50 transition-all relative overflow-hidden group"
            >
              {/* Premium Availability Badge */}
              <div className="absolute top-0 right-0 py-2.5 px-6 bg-teal-500 text-white rounded-bl-[28px] text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                {trip.seats} SEATS OPEN
              </div>

              <div className="flex justify-between items-start mb-8 pr-12">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[28px] bg-[#F6F8FA] flex items-center justify-center border-2 border-white shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <Bus size={28} className="text-navy-900" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-navy-900 tracking-tighter">{trip.busType}</span>
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">{trip.busNo}</span>
                       <div className="w-1 h-1 bg-gray-100 rounded-full" />
                       <span className="text-[10px] text-teal-500 font-black uppercase tracking-widest">Premium AC</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50 rounded-xl border border-yellow-100">
                     <Star size={14} className="text-yellow-500 fill-yellow-500" />
                     <span className="text-sm font-black text-yellow-700">{trip.rating}</span>
                   </div>
                   <span className="text-[8px] font-black text-gray-200 uppercase tracking-widest mr-1">Verified Hub</span>
                </div>
              </div>

              {/* Voyage Timeline */}
              <div className="bg-[#F6F8FA] p-6 rounded-[32px] border-2 border-white shadow-inner flex justify-between items-center mb-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-navy-900 tracking-tighter leading-none">{trip.depTime}</span>
                  <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest mt-1.5 ml-0.5">Terminal Departure</span>
                </div>

                <div className="flex-1 px-8 relative flex flex-col items-center justify-center gap-1.5">
                   <div className="w-full flex items-center justify-between opacity-10">
                      <div className="w-2 h-2 rounded-full bg-navy-900" />
                      <div className="flex-1 border-t-2 border-dotted border-navy-900 mx-2" />
                      <div className="w-2 h-2 rounded-full bg-navy-900" />
                   </div>
                   <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100 relative z-10">
                      <Clock size={12} className="text-teal-500" />
                      <span className="text-[9px] font-black text-navy-900 uppercase tracking-widest">3H 30M</span>
                   </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-2xl font-black text-navy-900 tracking-tighter leading-none">{trip.arrTime}</span>
                  <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest mt-1.5 mr-0.5">Arrival Port</span>
                </div>
              </div>

              <div className="flex justify-between items-center px-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">Hub Terminal B2</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100" />
                  <span className="text-[9px] font-black text-teal-500 uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-lg">WiFi On-Board</span>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-end leading-none">
                    <span className="text-[10px] text-gray-200 font-black line-through uppercase tracking-tighter mb-1">$22 Standard</span>
                    <span className="text-4xl font-black text-navy-900 tracking-tighter">${trip.price}</span>
                  </div>
                  <div className="w-14 h-14 rounded-[24px] bg-navy-900 flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all shadow-2xl shadow-navy-200">
                    <ChevronLeft className="rotate-180" size={24} strokeWidth={4} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {MOCK_TRIPS.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center px-12">
             <div className="w-24 h-24 bg-white rounded-[40px] shadow-xl border-4 border-gray-50 flex items-center justify-center mb-8">
               <Bus size={40} className="text-gray-200" strokeWidth={1.5} />
             </div>
             <h3 className="text-2xl font-black text-navy-900 tracking-tight mb-2">Network Quiet</h3>
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] max-w-[280px]">No active voyages detected for this sector today.</p>
          </div>
        )}
      </div>

      {/* Floating Tactical Search Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-8 pt-4 pb-12 z-50 pointer-events-none">
         <div className="bg-white/40 backdrop-blur-2xl p-4 border border-white/50 rounded-[40px] shadow-2xl flex items-center justify-between max-w-md mx-auto pointer-events-auto">
            <button className="flex-1 flex items-center justify-center gap-4 py-4 px-6 bg-navy-900 text-white rounded-[28px] shadow-xl active:scale-95 transition-all">
               <Search size={18} strokeWidth={3} />
               <span className="text-[10px] font-black uppercase tracking-widest">Filters</span>
            </button>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 mx-6" />
            <button className="flex-1 flex items-center justify-center gap-4 py-4 px-6 bg-[#F6F8FA] text-navy-900 rounded-[28px] border border-white shadow-sm active:scale-95 transition-all">
               <Clock size={18} strokeWidth={3} />
               <span className="text-[10px] font-black uppercase tracking-widest">History</span>
            </button>
         </div>
      </div>
    </div>
  );
}