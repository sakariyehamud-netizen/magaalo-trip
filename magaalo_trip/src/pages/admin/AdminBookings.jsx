import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Filter, Download, MoreVertical, MapPin, Bus, User, Calendar, Clock, ChevronRight, X, Check, Trash2, Edit3, MessageSquare, Plus, DollarSign } from 'lucide-react';

const MOCK_BOOKINGS = [
  { id: 'BK-9182', passenger: 'Safar Hersi', phone: '+252 63 444111', route: 'Hargeisa → Berbera', date: 'Oct 24, 08:30 AM', seat: '2A', status: 'Confirmed', amount: 30 },
  { id: 'BK-9181', passenger: 'Nimco Ali', phone: '+252 63 555222', route: 'Berbera → Hargeisa', date: 'Oct 24, 07:45 AM', seat: '2B', status: 'Confirmed', amount: 15 },
  { id: 'BK-9170', passenger: 'Abdi Bile', phone: '+252 63 999222', route: 'Garowe → Bossaso', date: 'Oct 23, 04:20 PM', seat: '4C', status: 'Completed', amount: 25 },
  { id: 'BK-9168', passenger: 'Fozia Faris', phone: '+252 63 777333', route: 'Mogadishu → Baidoa', date: 'Oct 23, 11:10 AM', seat: '1A', status: 'Cancelled', amount: 45 },
  { id: 'BK-9165', passenger: 'Liban Noor', phone: '+252 63 888444', route: 'Hargeisa → Borama', date: 'Oct 22, 09:00 AM', seat: '5D', status: 'Completed', amount: 10 },
];

export default function AdminBookings() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [activeFilter, setActiveFilter] = useState('All Bookings');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    passenger: '', phone: '', route: '', date: '', seat: '', amount: ''
  });

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'confirmed': return 'bg-teal-50 text-[#17A2A9] border-[#17A2A9]/10 shadow-teal-500/5';
      case 'completed': return 'bg-navy-50 text-[#0B3D91] border-navy-100/50 shadow-navy-100/5';
      case 'cancelled': return 'bg-red-50 text-red-500 border-red-100 shadow-red-500/5';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    const id = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookings([{ ...newBooking, id, status: 'Confirmed' }, ...bookings]);
    setShowAddModal(false);
    setNewBooking({ passenger: '', phone: '', route: '', date: '', seat: '', amount: '' });
  };

  const filteredBookings = bookings.filter(b => {
    if (activeFilter === 'Live') return b.status === 'Confirmed';
    if (activeFilter === 'Historical') return b.status === 'Completed';
    if (activeFilter === 'Failed') return b.status === 'Cancelled';
    return true;
  });

  return (
    <div className="space-y-12 relative">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/20 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:bg-indigo-50/40 transition-colors"></div>
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-indigo-500 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-indigo-100 border-4 border-white transform rotate-[3deg] group-hover:rotate-0 transition-transform duration-500 ring-2 ring-gray-50">
               <BookOpen size={36} strokeWidth={3} />
            </div>
            <div className="flex flex-col gap-1">
               <h1 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">Reservations Audit</h1>
               <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 shadow-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 leading-none">{bookings.length} Global Transactions</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Global Booking Archive</span>
               </div>
            </div>
         </div>

         <div className="flex gap-4 relative z-10 w-full lg:w-fit">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-indigo-500 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-indigo-100 active:scale-95 transition-all group/btn"
            >
               <Plus size={20} strokeWidth={4} className="group-hover/btn:rotate-90 transition-transform duration-500" />
               Manual Entry Ticket
            </button>
            <button className="w-16 h-16 bg-white border-4 border-gray-50 rounded-[28px] flex items-center justify-center text-gray-400 hover:text-navy-900 shadow-sm transition-all active:scale-95 active:rotate-12 outline-none">
               <Download size={24} strokeWidth={4} />
            </button>
         </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
         <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-2">
            <div className="relative group w-full md:w-[480px]">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2A9] transition-colors">
                  <Search size={22} strokeWidth={3} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search by ID, Passenger or Phone..." 
                 className="w-full pl-16 pr-6 py-5 bg-[#F6F8FA] border-2 border-transparent rounded-[32px] text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
               />
            </div>
            <div className="flex gap-4 w-full md:w-fit overflow-x-auto no-scrollbar pb-1">
               {['All Bookings', 'Live', 'Historical', 'Failed'].map((f) => (
                 <button 
                  key={f} 
                  onClick={() => setActiveFilter(f)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-navy-900 text-white shadow-xl translate-y-[-1px]' : 'bg-[#F6F8FA] text-gray-300 border-2 border-transparent hover:bg-gray-100'}`}
                 >
                    {f}
                 </button>
               ))}
            </div>
         </div>

         {/* Bookings Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b-2 border-gray-50">
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Booking Reference</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Passenger & Contact</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Journey Route</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Details</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Transaction</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">State</th>
                     <th className="pb-8 px-6"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="group hover:bg-[#F6F8FA] transition-all duration-300 active:scale-[0.995]">
                       <td className="py-10 px-6">
                          <span className="text-sm font-black text-[#0B3D91] tracking-tighter font-mono bg-navy-50 px-3 py-1.5 rounded-lg border border-navy-100/30 font-semibold group-hover:bg-white group-hover:border-navy-900 transition-all">{booking.id}</span>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex items-center gap-5 translate-x-0 group-hover:translate-x-2 transition-transform">
                             <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] flex items-center justify-center text-white text-base font-black border-2 border-white shadow-sm ring-2 ring-gray-50">
                                {booking.passenger.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div className="flex flex-col gap-0.5">
                                <span className="text-base font-black text-navy-900 leading-none">{booking.passenger}</span>
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{booking.phone}</span>
                             </div>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex flex-col gap-1.5 transform group-hover:translate-x-1 transition-transform">
                             <span className="text-sm font-black text-gray-800 leading-none truncate max-w-[150px]">{booking.route}</span>
                             <div className="flex items-center gap-2">
                                <MapPin size={10} className="text-teal-500" />
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Main Terminal Access</span>
                             </div>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-3">
                                <Calendar size={12} className="text-gray-300" />
                                <span className="text-xs font-black text-gray-500 tracking-tighter whitespace-nowrap">{booking.date}</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <Check size={12} className="text-[#17A2A9]" />
                                <span className="text-xs font-black text-[#17A2A9] tracking-tighter uppercase tracking-widest text-[9px]">Seat Assigned · {booking.seat}</span>
                             </div>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex flex-col items-start bg-white p-3 px-5 rounded-[24px] shadow-inner-lg border-2 border-gray-50/50 w-fit group-hover:shadow-xl transition-all">
                             <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Total Paid</span>
                             <span className="text-2xl font-black text-navy-900 tracking-tighter leading-none">${booking.amount}</span>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className={`px-5 py-2.5 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center gap-2 transition-all w-fit ${getStatusStyle(booking.status)}`}>
                             <div className={`w-2 h-2 rounded-full ${booking.status === 'Confirmed' ? 'bg-[#17A2A9] animate-pulse' : booking.status === 'Completed' ? 'bg-navy-900' : 'bg-red-500'}`}></div>
                             <span className="text-[10px] font-black uppercase tracking-widest leading-none">{booking.status}</span>
                          </div>
                       </td>
                       <td className="py-10 px-6 text-center">
                          <div className="flex items-center gap-3">
                             <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-100 hover:text-navy-900 shadow-sm border border-gray-50 hover:shadow-xl active:scale-95 transition-all outline-none"><MessageSquare size={18} strokeWidth={2.5} /></button>
                             <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-100 hover:text-red-500 shadow-sm border border-gray-50 hover:shadow-xl active:scale-95 transition-all outline-none font-black text-xl"><X size={18} strokeWidth={4} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Manual Entry Ticket Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-navy-900/40 backdrop-blur-xl"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[60px] shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden border-8 border-white"
            >
              <div className="bg-indigo-500 p-12 text-white relative">
                 <button 
                   onClick={() => setShowAddModal(false)}
                   className="absolute top-8 right-8 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all active:scale-90"
                 >
                   <X size={24} strokeWidth={3} />
                 </button>
                 <h2 className="text-3xl font-black tracking-tighter mb-2">Reservation Override</h2>
                 <p className="text-white/60 text-[10px] uppercase font-black tracking-[0.4em]">Manual Ticketing Protocol</p>
              </div>

              <form onSubmit={handleAddBooking} className="p-12 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Passenger Nexus</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: Safar Hersi" 
                         value={newBooking.passenger}
                         onChange={(e) => setNewBooking({...newBooking, passenger: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Secure Contact</label>
                       <input 
                         required
                         type="tel" 
                         placeholder="+252 63..." 
                         value={newBooking.phone}
                         onChange={(e) => setNewBooking({...newBooking, phone: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Assigned Seat</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: 5A" 
                         value={newBooking.seat}
                         onChange={(e) => setNewBooking({...newBooking, seat: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Baseline Fare ($)</label>
                       <input 
                         required
                         type="number" 
                         placeholder="30" 
                         value={newBooking.amount}
                         onChange={(e) => setNewBooking({...newBooking, amount: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Journey Route</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: Hargeisa → Berbera" 
                         value={newBooking.route}
                         onChange={(e) => setNewBooking({...newBooking, route: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Operational Timetable</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: Oct 25, 10:00 AM" 
                         value={newBooking.date}
                         onChange={(e) => setNewBooking({...newBooking, date: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-6 mt-4 bg-navy-900 text-white rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-navy-200 active:scale-95 transition-all outline-none"
                 >
                    Execute Manual Reservation
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}