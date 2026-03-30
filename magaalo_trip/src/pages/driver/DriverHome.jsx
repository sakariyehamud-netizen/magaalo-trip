import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Truck, TrendingUp, Compass, BookOpen, Clock, ChevronRight, MapPin, Map, Navigation2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const UPCOMING_TRIPS = [
  { id: 1, from: 'Hargeisa', to: 'Berbera', time: '08:00 AM', seatsFilled: 12, maxSeats: 15, status: 'boarding' },
  { id: 2, from: 'Hargeisa', to: 'Garowe', time: '11:00 AM', seatsFilled: 8, maxSeats: 15, status: 'upcoming' },
];

export default function DriverHome() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-24">
      {/* Header Overlay */}
      <div className="brand-gradient pt-16 pb-24 px-8 rounded-b-[60px] relative overflow-hidden text-white shadow-2xl shadow-navy-900/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="flex justify-between items-start relative z-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-black tracking-tight leading-none group">
               Hello, Dahir! 👋
            </h1>
            <p className="text-white/70 text-sm font-bold uppercase tracking-widest mt-2">Driver Panel · Magaalo Trip</p>
          </div>
          <button className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-[28px] flex items-center justify-center border-4 border-white/20 relative shadow-2xl active:scale-95 transition-all">
            <Bell size={24} className="text-white" />
            <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-[#17A2A9] rounded-full border-4 border-navy-900 shadow-sm"></span>
          </button>
        </div>
      </div>

      {/* Main Stats Summary Dashboard */}
      <div className="px-8 -mt-12 relative z-20 space-y-6">
        <motion.div 
           whileHover={{ y: -5 }}
           className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-8 border border-gray-50 flex items-center justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Week Earnings</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-navy-900">$1,245.80</span>
              <div className="flex items-center gap-1 text-[#17A2A9] bg-teal-50 px-2 py-0.5 rounded-lg border border-teal-100/50">
                <TrendingUp size={12} strokeWidth={3} />
                <span className="text-[10px] font-black tracking-tighter leading-none">+12.4%</span>
              </div>
            </div>
          </div>
          <div className="w-16 h-16 bg-[#F6F8FA] rounded-[28px] flex items-center justify-center text-[#17A2A9] border-2 border-white shadow-inner-lg">
             <Truck size={32} strokeWidth={2.5} />
          </div>
        </motion.div>

        {/* Actionable Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Active', value: '01', icon: Navigation2, color: 'text-teal-500' },
            { label: 'Upcoming', value: '03', icon: Clock, color: 'text-indigo-500' },
            { label: 'Seats', value: '45', icon: BookOpen, color: 'text-rose-500' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center gap-2">
              <div className={`p-2 rounded-xl bg-[#F6F8FA] ${stat.color} shadow-sm border border-white`}>
                <stat.icon size={18} strokeWidth={3} />
              </div>
              <span className="text-xl font-black text-navy-900 leading-none">{stat.value}</span>
              <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Active Trip Alert (The Big Next One) */}
        <div className="bg-teal-50 rounded-[48px] border-4 border-white p-2 shadow-2xl shadow-teal-900/5 overflow-hidden group">
           <div className="flex flex-col p-8 gap-10">
              <div className="flex justify-between items-start">
                 <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em] leading-none mb-1">Active Journey</span>
                    <h3 className="text-2xl font-black text-navy-900 leading-none flex items-center gap-3">
                       Hargeisa <ChevronRight size={18} className="text-gray-200" /> Berbera
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                       <MapPin size={12} className="text-teal-400" />
                       <span className="text-[10px] font-black text-teal-900/40 uppercase tracking-widest">Boarding · Gate 4</span>
                    </div>
                 </div>
                 <div className="w-14 h-14 bg-white/50 backdrop-blur-xl border-4 border-teal-100 rounded-[24px] flex items-center justify-center text-teal-600 shadow-xl shadow-teal-100 active:scale-95 transition-all">
                    <Navigation2 size={24} strokeWidth={3} className="fill-teal-600" />
                 </div>
              </div>

              <div className="w-full h-2.5 bg-white/50 rounded-full relative overflow-hidden border-2 border-teal-100 shadow-inner">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: '82%' }}
                   transition={{ duration: 1.5, ease: 'easeOut' }}
                   className="absolute left-0 top-0 bottom-0 bg-teal-500 rounded-full shadow-[0_0_12px_rgba(20,184,166,0.3)]"
                 />
              </div>

              <div className="flex items-center justify-between">
                 <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <div key={p} className="w-10 h-10 bg-[#F6F8FA] rounded-2xl border-4 border-white flex items-center justify-center text-[10px] font-black text-teal-900 ring-2 ring-teal-50">
                        {p}
                      </div>
                    ))}
                    <div className="w-10 h-10 bg-white rounded-2xl border-4 border-teal-50 flex items-center justify-center text-[10px] font-black text-navy-900 shadow-sm">+7</div>
                 </div>
                 <Link 
                   to="/driver/trip/1"
                   className="px-8 py-4 bg-navy-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-navy-100 active:scale-95 transition-all"
                 >
                   Open Dashboard
                 </Link>
              </div>
           </div>
        </div>

        {/* Upcoming List */}
        <div className="flex flex-col gap-6 pt-4">
           <div className="flex justify-between items-center px-2">
              <h4 className="text-lg font-black text-navy-900 leading-none">Tomorrow's Schedule</h4>
              <button className="text-[10px] font-black text-navy-900/40 uppercase tracking-widest leading-none border-b-2 border-transparent hover:border-navy-900/10 active:opacity-50 transition-all">View All List</button>
           </div>
           
           <div className="space-y-4">
              {UPCOMING_TRIPS.map((trip) => (
                <div key={trip.id} className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm flex items-center justify-between group">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 group-hover:bg-[#F6F8FA] group-hover:text-navy-900 transition-all">
                        <Map size={20} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-navy-900 group-hover:translate-x-1 transition-transform">{trip.from} → {trip.to}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{trip.time}</span>
                          <div className="w-1 h-1 bg-gray-100 rounded-full"></div>
                          <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{trip.seatsFilled}/{trip.maxSeats} Booked</span>
                        </div>
                      </div>
                   </div>
                   <ChevronRight size={18} className="text-gray-100 group-hover:text-navy-900 transition-colors" />
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}