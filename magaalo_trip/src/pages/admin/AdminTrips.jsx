import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Calendar, Clock, Plus, Search, MoreVertical, Truck, MapPin, ChevronRight, X, Info, Download, Filter, Trash2, Edit3, Bus, User, DollarSign, Check } from 'lucide-react';

const MOCK_TRIPS = [
  { id: 1, routeId: 1, routeName: 'Coastal Express', from: 'Hargeisa', to: 'Berbera', driver: 'Dahir Hassan', depTime: 'Today, 08:30 AM', seats: '12/15', price: 15, status: 'Active' },
  { id: 2, routeId: 2, routeName: 'Northern Hub', from: 'Garowe', to: 'Bossaso', driver: 'Nimco Ali', depTime: 'Today, 11:00 AM', seats: '8/15', price: 20, status: 'Boarding' },
  { id: 3, routeId: 3, routeName: 'Western Trail', from: 'Hargeisa', to: 'Borama', driver: 'Abdi Bile', depTime: 'Tomorrow, 09:00 AM', seats: '0/15', price: 10, status: 'Scheduled' },
  { id: 4, routeId: 1, routeName: 'Coastal Express', from: 'Hargeisa', to: 'Berbera', driver: 'Fozia Faris', depTime: 'Yesterday, 02:00 PM', seats: '15/15', price: 15, status: 'Completed' },
];

const STATUS_FILTERS = ['All', 'Scheduled', 'Boarding', 'Active', 'Completed', 'Cancelled'];

export default function AdminTrips() {
  const [trips, setTrips] = useState(MOCK_TRIPS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [newTrip, setNewTrip] = useState({
    route: 'Coastal Express', from: '', to: '', driver: '', depTime: '', price: 15
  });

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-teal-50 text-teal-600 border-teal-100 shadow-teal-500/10';
      case 'boarding': return 'bg-indigo-50 text-indigo-500 border-indigo-100 shadow-indigo-500/10';
      case 'scheduled': return 'bg-navy-50 text-[#0B3D91] border-navy-100 shadow-navy-100/10';
      case 'completed': return 'bg-gray-50 text-gray-400 border-gray-100 opacity-60';
      case 'cancelled': return 'bg-red-50 text-red-500 border-red-100 shadow-red-500/10';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    const id = trips.length + 1;
    setTrips([{ ...newTrip, id, seats: '0/15', status: 'Scheduled' }, ...trips]);
    setShowDispatchModal(false);
    setNewTrip({ route: 'Coastal Express', from: '', to: '', driver: '', depTime: '', price: 15 });
  };

  const filteredTrips = trips.filter(t => activeFilter === 'All' || t.status === activeFilter);

  return (
    <div className="space-y-12 relative">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#17A2A9]/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:bg-[#17A2A9]/20 transition-colors"></div>
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-[#17A2A9] rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-teal-100 border-4 border-white transform rotate-[3deg] group-hover:rotate-0 transition-transform duration-500 ring-2 ring-gray-50">
               <Compass size={36} strokeWidth={3} />
            </div>
            <div className="flex flex-col gap-1">
               <h1 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">Trip Scheduling</h1>
               <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 bg-navy-50 px-3 py-1 rounded-lg border border-navy-100 shadow-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#0B3D91] animate-pulse"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#0B3D91] leading-none">{trips.length} Journey Logs Found</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Fleet Management Tool</span>
               </div>
            </div>
         </div>

         <div className="flex gap-4 relative z-10 w-full lg:w-fit">
            <button 
              onClick={() => setShowDispatchModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-[#17A2A9] text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-teal-100 active:scale-95 transition-all group/btn"
            >
               <Plus size={20} strokeWidth={4} className="group-hover/btn:rotate-90 transition-transform duration-500" />
               Dispatch New Trip
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-2">
            <div className="flex gap-3 overflow-x-auto no-scrollbar w-full md:w-fit pb-1">
               {STATUS_FILTERS.map((f) => (
                 <button 
                  key={f} 
                  onClick={() => setActiveFilter(f)}
                  className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-navy-900 text-white shadow-xl translate-y-[-1px]' : 'bg-[#F6F8FA] text-gray-300 border-2 border-transparent hover:bg-gray-100'}`}
                 >
                    {f}
                 </button>
               ))}
            </div>
            
            <div className="relative group w-full md:w-[360px]">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2A9] transition-colors">
                  <Search size={18} strokeWidth={3} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search by trip or driver..." 
                 className="w-full pl-14 pr-6 py-4 bg-[#F6F8FA] border-2 border-transparent rounded-[24px] text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
               />
            </div>
         </div>

         {/* Trips Grid View */}
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
               {filteredTrips.map((trip, idx) => (
                 <motion.div 
                   key={trip.id}
                   layout
                   initial={{ opacity: 0, scale: 0.9, y: 30 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9, y: 30 }}
                   transition={{ duration: 0.5, type: 'spring' }}
                   className="bg-white rounded-[48px] border-4 border-gray-50 p-8 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group relative overflow-hidden active:scale-[0.99]"
                 >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gray-50/50 rounded-full -mr-20 -mt-20 border-8 border-white opacity-40 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex justify-between items-start relative z-10 mb-8">
                       <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-black text-[#17A2A9] uppercase tracking-widest leading-none mb-1">Route No. MT-R{trip.routeId || 'X'}</span>
                          <h3 className="text-2xl font-black text-navy-900 leading-none tracking-tighter group-hover:translate-x-1 transition-transform">{trip.from} → {trip.to}</h3>
                       </div>
                       <div className={`px-5 py-2.5 rounded-2xl border-4 border-white shadow-xl flex items-center gap-2 transition-all ${getStatusStyle(trip.status)}`}>
                          <div className={`w-2 h-2 rounded-full ${trip.status === 'Active' ? 'bg-[#17A2A9] animate-pulse' : trip.status === 'Boarding' ? 'bg-indigo-500 animate-bounce' : 'bg-navy-900 font-black'}`}></div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{trip.status}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-8 border-t border-gray-50 border-dashed pt-8 relative z-10">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center text-gray-300 border-4 border-white shadow-sm ring-2 ring-gray-50 group-hover:bg-[#F6F8FA] group-hover:text-navy-900 transition-all">
                             <User size={20} />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 leading-none">Vehicle Pilot</span>
                             <span className="text-sm font-black text-navy-900 leading-tight group-hover:text-indigo-500 transition-colors uppercase tracking-widest text-[11px] truncate md:max-w-[120px]">{trip.driver}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center text-gray-300 border-4 border-white shadow-sm ring-2 ring-gray-50 group-hover:bg-[#F6F8FA] group-hover:text-navy-900 transition-all">
                             <Clock size={20} />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 leading-none">Departure</span>
                             <span className="text-sm font-black text-navy-900 leading-tight">{trip.depTime}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center text-gray-300 border-4 border-white shadow-sm ring-2 ring-gray-50 group-hover:bg-[#F6F8FA] group-hover:text-navy-900 transition-all">
                             <Bus size={20} />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 leading-none">Capacity</span>
                             <span className="text-sm font-black text-navy-900 leading-tight">{trip.seats} Occupied</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center text-gray-300 border-4 border-white shadow-sm ring-2 ring-gray-50 group-hover:bg-[#F6F8FA] group-hover:text-navy-900 transition-all">
                             <DollarSign size={20} />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 leading-none">Standard Fare</span>
                             <span className="text-xl font-black text-navy-900 leading-none tracking-tighter">${trip.price}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-4 mt-10 pt-4 relative z-10 w-full">
                       <button className="flex-1 py-4 bg-[#F6F8FA] rounded-[18px] text-[10px] font-black uppercase tracking-widest text-navy-900 shadow-sm border border-white hover:bg-navy-50 active:scale-95 transition-all outline-none">Manage Passengers</button>
                       <button className="flex-1 py-4 bg-[#F6F8FA] rounded-[18px] text-[10px] font-black uppercase tracking-widest text-indigo-500 shadow-sm border border-white hover:bg-indigo-50 active:scale-95 transition-all outline-none">Edit Journey</button>
                       <button className="w-14 h-14 bg-[#F6F8FA] rounded-[18px] flex items-center justify-center text-gray-100 hover:text-red-500 shadow-sm border border-white active:scale-95 transition-all outline-none"><Trash2 size={20} /></button>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </div>

      {/* Dispatch Modal */}
      <AnimatePresence>
        {showDispatchModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDispatchModal(false)}
              className="absolute inset-0 bg-navy-900/40 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[60px] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden border-8 border-white"
            >
              <div className="bg-[#17A2A9] p-12 text-white relative">
                 <button 
                   onClick={() => setShowDispatchModal(false)}
                   className="absolute top-8 right-8 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all active:scale-90"
                 >
                   <X size={24} strokeWidth={3} />
                 </button>
                 <h2 className="text-3xl font-black tracking-tighter mb-2">Fleet Dispatch</h2>
                 <p className="text-white/60 text-[10px] uppercase font-black tracking-[0.4em]">Initialize Operational Voyage</p>
              </div>

              <form onSubmit={handleDispatch} className="p-12 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Assigned Driver</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: Dahir Hassan" 
                         value={newTrip.driver}
                         onChange={(e) => setNewTrip({...newTrip, driver: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Departure Command</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: Today, 04:00 PM" 
                         value={newTrip.depTime}
                         onChange={(e) => setNewTrip({...newTrip, depTime: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Port of Origin</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: Hargeisa" 
                         value={newTrip.from}
                         onChange={(e) => setNewTrip({...newTrip, from: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Terminal Objective</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: Berbera" 
                         value={newTrip.to}
                         onChange={(e) => setNewTrip({...newTrip, to: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-6 mt-4 bg-[#17A2A9] text-white rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-teal-200 active:scale-95 transition-all outline-none"
                 >
                    Execute Dispatch Protocol
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}