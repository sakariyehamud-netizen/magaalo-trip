import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar, Clock, Ticket as TicketIcon, MapPin, Hash } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const MOCK_TICKETS = [
  { id: 1, from: 'Hargeisa', to: 'Berbera', date: '24 Oct, 2024', time: '08:00 AM', seats: '2A, 2B', busNo: 'MT-V091', status: 'upcoming', price: 30, color: 'bg-teal-500' },
  { id: 2, from: 'Garowe', to: 'Bossaso', date: '18 Oct, 2024', time: '10:30 AM', seats: '4C', busNo: 'MT-S112', status: 'completed', price: 20, color: 'bg-gray-400' },
  { id: 3, from: 'Mogadishu', to: 'Baidoa', date: '12 Oct, 2024', time: '02:00 PM', seats: '1A', busNo: 'MT-E204', status: 'cancelled', price: 25, color: 'bg-red-500' },
];

const TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function MyTickets() {
  const [activeTab, setActiveTab ] = useState('upcoming');
  const navigate = useNavigate();

  const filteredTickets = MOCK_TICKETS.filter(t => t.status === activeTab);

  return (
    <div className="flex flex-col min-h-screen pb-20 overflow-hidden">
      {/* Header */}
      <div className="brand-gradient pt-16 pb-12 px-6 rounded-b-[40px] text-white">
        <h1 className="text-3xl font-black mb-6">My Tickets</h1>
        
        {/* Tab Bar */}
        <div className="flex bg-white/10 backdrop-blur-md rounded-[24px] p-1.5 border border-white/20">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-navy-900 shadow-md translate-y-[-1px]' : 'text-white hover:bg-white/10'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 flex flex-col gap-5">
        <AnimatePresence mode="wait">
          {filteredTickets.length > 0 ? (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {filteredTickets.map((ticket, idx) => (
                <Link 
                   key={ticket.id} 
                   to={`/ticket/${ticket.id}`}
                   className="block bg-white rounded-[32px] overflow-hidden shadow-sm shadow-gray-100/80 border border-gray-50 active:scale-[0.98] transition-all group"
                >
                  <div className={`h-2 w-full ${ticket.color}`}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-black text-navy-900 leading-none">{ticket.from}</span>
                          <ChevronRight size={14} className="text-gray-300" />
                          <span className="text-xl font-black text-navy-900 leading-none">{ticket.to}</span>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Direct Flight Replacement</p>
                      </div>
                      <div className={`px-3 py-1.5 rounded-xl flex items-center gap-2 border ${ticket.status === 'upcoming' ? 'bg-teal-50 border-teal-100 text-teal-600' : ticket.status === 'completed' ? 'bg-gray-50 border-gray-100 text-gray-500' : 'bg-red-50 border-red-100 text-red-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'upcoming' ? 'bg-teal-500 animate-pulse' : ticket.status === 'completed' ? 'bg-gray-400' : 'bg-red-500'}`}></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{ticket.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-5 border-t border-gray-50 pt-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                          <Calendar size={16} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Date</span>
                          <span className="text-xs font-black text-navy-900 tracking-tight">{ticket.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                           <Clock size={16} />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Time</span>
                           <span className="text-xs font-black text-navy-900 tracking-tight">{ticket.time}</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                           <Hash size={16} />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Seats</span>
                           <span className="text-xs font-black text-navy-900 tracking-tight">{ticket.seats}</span>
                         </div>
                      </div>
                      <div className="flex items-center justify-end">
                         <div className="flex flex-col items-end">
                           <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Price Paid</span>
                           <span className="text-lg font-black text-navy-900 tracking-tight">${ticket.price}</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div 
               key="empty"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="py-16 flex flex-col items-center justify-center text-center px-12"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
                 <TicketIcon size={40} className="text-gray-200" />
                 <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-200 border-2 border-gray-50 font-black text-[10px]">!</div>
              </div>
              <h3 className="text-xl font-black text-navy-900 mb-2">No tickets found</h3>
              <p className="text-sm text-gray-400 font-semibold max-w-[220px]">You have no {activeTab} tickets at the moment.</p>
              
              <Link to="/search" className="mt-8 px-8 py-4 bg-[#17A2A9] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-teal-900/10">
                Book a Trip
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}