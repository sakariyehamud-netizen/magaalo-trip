import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, User, Phone, Check, X, Search, MoreVertical, Ticket as TicketIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_BOOKINGS = [
  { id: 1, name: 'Safar Hersi', phone: '+252 63 444000', seat: '2A', amount: 30, status: 'checked-in', date: 'Oct 24, 2024' },
  { id: 2, name: 'Nimco Ali', phone: '+252 63 555111', seat: '2B', amount: 30, status: 'confirmed', date: 'Oct 24, 2024' },
  { id: 3, name: 'Abdi Bile', phone: '+252 63 999222', seat: '4C', amount: 20, status: 'confirmed', date: 'Oct 24, 2024' },
  { id: 4, name: 'Fozia Faris', phone: '+252 63 777333', seat: '1A', amount: 15, status: 'cancelled', date: 'Oct 24, 2024' },
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'checked-in', label: 'Checked-in' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function DriverBookings() {
  const [activeTab, setActiveTab ] = useState('all');
  const [search, setSearch] = useState('');

  const filteredBookings = MOCK_BOOKINGS.filter(b => {
    const matchesTab = activeTab === 'all' || b.status === activeTab;
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.seat.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-24">
      {/* Header */}
      <div className="brand-gradient pt-16 pb-12 px-8 rounded-b-[60px] text-white shadow-2xl shadow-navy-900/40">
        <h1 className="text-3xl font-black mb-10 tracking-tight leading-none">Trip Bookings</h1>
        
        {/* Search Bar */}
        <div className="relative mb-8 group">
           <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors">
              <Search size={20} strokeWidth={3} />
           </div>
           <input 
             type="text" 
             placeholder="Search by name or seat..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full pl-16 pr-6 py-5 bg-white/10 backdrop-blur-2xl border-4 border-white/20 rounded-[32px] text-white font-bold placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-white/10"
           />
        </div>

        {/* Tab Bar Container */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all border-4 whitespace-nowrap active:scale-95 transition-all ${activeTab === tab.id ? 'bg-white text-navy-900 border-white shadow-2xl translate-y-[-2px]' : 'bg-white/10 text-white border-white/10 hover:bg-white/20 hover:border-white/20'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-10 space-y-6">
        <AnimatePresence mode="wait">
          {filteredBookings.length > 0 ? (
            <motion.div 
              key={activeTab + search}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center px-1 mb-2">
                 <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Current List</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-navy-900/10"></div>
                    <span className="text-[10px] font-black text-navy-900 uppercase tracking-widest leading-none">{filteredBookings.length} Passengers</span>
                 </div>
              </div>

              {filteredBookings.map((booking) => (
                <div 
                   key={booking.id}
                   className={`bg-white p-8 rounded-[48px] border shadow-sm transition-all flex flex-col gap-10 group relative overflow-hidden ${booking.status === 'checked-in' ? 'border-teal-100 bg-teal-50/20' : booking.status === 'cancelled' ? 'border-red-50 bg-red-50/20 opacity-60' : 'border-gray-50 hover:shadow-xl hover:shadow-gray-200/50 hover:translate-y-[-2px]'}`}
                >
                   {/* Background Overlay */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#F6F8FA] rounded-full -mr-16 -mt-16 border-8 border-white shadow-inner opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   
                   <div className="flex justify-between items-start relative z-10">
                      <div className="flex items-center gap-6">
                         <div className="relative">
                            <div className={`w-16 h-16 rounded-[28px] border-4 border-white shadow-2xl flex items-center justify-center text-xl font-black transition-all ${booking.status === 'checked-in' ? 'bg-[#17A2A9] text-white shadow-teal-500/20 scale-110' : 'bg-[#F6F8FA] text-gray-300 group-hover:bg-white group-hover:text-navy-900 group-hover:shadow-xl'}`}>
                               {booking.seat}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-xl border-4 border-white flex items-center justify-center shadow-lg transition-all ${booking.status === 'checked-in' ? 'bg-green-500 text-white translate-x-1 translate-y-1' : 'bg-white text-gray-200'}`}>
                               <Check size={14} strokeWidth={4} />
                            </div>
                         </div>
                         <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-black text-navy-900 leading-none group-hover:translate-x-1 transition-transform">{booking.name}</h3>
                            <div className="flex items-center gap-3">
                               <div className="px-3 py-1 bg-gray-50 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:bg-navy-50 group-hover:text-navy-900 transition-colors">Seat {booking.seat}</div>
                               <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">{booking.date}</span>
                            </div>
                         </div>
                      </div>
                      <div className="p-2 text-gray-200 hover:text-navy-900 transition-colors pointer-events-auto">
                         <MoreVertical size={24} />
                      </div>
                   </div>

                   <div className="flex items-center justify-between relative z-10 pt-4 border-t border-gray-50 border-dashed">
                      <div className="flex gap-4">
                         <button className="w-14 h-14 bg-white border-4 border-gray-50 rounded-[28px] flex items-center justify-center text-navy-900 shadow-xl active:scale-95 transition-all">
                            <Phone size={24} strokeWidth={3} className="fill-navy-900/5" />
                         </button>
                         <div className="flex flex-col justify-center">
                            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Phone Number</span>
                            <span className="text-sm font-black text-navy-900 tracking-tight leading-none">{booking.phone}</span>
                         </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                         <div className="flex flex-col items-end justify-center px-4 border-r border-gray-50 mr-2">
                            <span className="text-[9px] font-black text-navy-900/40 uppercase tracking-widest mb-1">Fare Paid</span>
                            <span className="text-xl font-black text-navy-900 leading-none tracking-tighter">${booking.amount}</span>
                         </div>
                         {booking.status === 'confirmed' ? (
                            <button className="w-14 h-14 bg-teal-500 text-white rounded-[28px] flex items-center justify-center shadow-2xl shadow-teal-500/20 active:scale-95 transition-all border-4 border-teal-50 border-dashed">
                               <Check size={28} strokeWidth={4} />
                            </button>
                         ) : booking.status === 'checked-in' ? (
                            <div className="w-14 h-14 bg-navy-900 text-white rounded-[28px] flex items-center justify-center shadow-2xl shadow-navy-200">
                               <div className="w-2.5 h-2.5 rounded-full bg-teal-400"></div>
                            </div>
                         ) : (
                            <div className="w-14 h-14 bg-gray-50 text-gray-200 rounded-[28px] flex items-center justify-center border-4 border-white shadow-inner">
                               <X size={24} strokeWidth={3} />
                            </div>
                         )}
                      </div>
                   </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
               key="empty"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="py-24 flex flex-col items-center justify-center text-center px-12"
            >
               <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-10 relative shadow-2xl shadow-gray-200/50 border-8 border-gray-50 overflow-hidden">
                  <div className="absolute inset-0 bg-navy-50 animate-pulse opacity-50"></div>
                  <TicketIcon size={64} className="text-gray-100 relative z-10" />
                  <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-[20px] flex items-center justify-center text-[#17A2A9] shadow-xl border-4 border-teal-50 font-black text-sm z-20">?</div>
               </div>
               <h3 className="text-3xl font-black text-navy-900 mb-4 tracking-tighter">No passengers found</h3>
               <p className="text-sm font-black text-gray-300 uppercase tracking-widest leading-loose max-w-[280px]">Check your filters or the trip manifest list for updates.</p>
               
               <button onClick={() => { setActiveTab('all'); setSearch(''); }} className="mt-12 px-12 py-5 bg-navy-900 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-navy-100 flex items-center gap-4 group active:scale-95 transition-all">
                  Refresh List
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                    <ChevronRight size={14} />
                  </div>
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}