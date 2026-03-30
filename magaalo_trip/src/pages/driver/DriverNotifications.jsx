import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Info, AlertTriangle, CheckCircle, AlertCircle, Trash2, ChevronLeft, MoreVertical, Settings, MessageSquare, History, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'alert', title: 'Route Update Required', message: 'Bridge construction on Berbera road. Please use the alternative route via Garowe bypass.', time: '10 Mins Ago', read: false },
  { id: 2, type: 'success', title: 'Weekly Payout Ready', message: 'Your earnings of $1,245.80 have been processed and transferred to your account.', time: '2 Hours Ago', read: false },
  { id: 3, type: 'warning', title: 'License Expiration', message: 'Your driver license will expire in 15 days. Please renew to continue driving.', time: '5 Hours Ago', read: true },
  { id: 4, type: 'info', title: 'New System Update', message: 'Magaalo Trip 2.0 is now live! Check out the new dark mode and tracking features.', time: 'Yesterday', read: true },
  { id: 5, type: 'alert', title: 'Urgent: Booking Cancelled', message: 'Safar Hersi cancelled their VIP seat on trip MT-001. Seat 2A is now available.', time: 'Just Now', read: false },
];

export default function DriverNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications ] = useState(MOCK_NOTIFICATIONS);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type) => {
    switch(type) {
      case 'info': return { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'warning': return { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50' };
      case 'success': return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' };
      case 'alert': return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' };
      default: return { icon: Bell, color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-24">
      {/* Header */}
      <div className="brand-gradient pt-16 pb-24 px-8 rounded-b-[60px] text-white shadow-2xl shadow-navy-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        
        <div className="flex justify-between items-start relative z-10">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)} 
                className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-[28px] flex items-center justify-center border-4 border-white/20 shadow-2xl active:scale-95 transition-all"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <div className="flex flex-col">
                 <h1 className="text-3xl font-black text-white leading-none">Notifications</h1>
                 <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-2">Alert Center · {notifications.filter(n => !n.read).length} Unread</p>
              </div>
           </div>
           <button className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-[28px] flex items-center justify-center border-4 border-white/20 shadow-xl text-white active:scale-95 transition-all">
             <Settings size={24} strokeWidth={2.5} />
           </button>
        </div>
      </div>

      <div className="px-8 -mt-12 relative z-20 space-y-6">
        {/* Bulk Actions Bar */}
        <div className="flex justify-between items-center px-4 bg-white py-4 rounded-[32px] shadow-2xl shadow-gray-200/50 border-4 border-gray-50">
           <div className="flex items-center gap-3">
              <div className="px-4 py-1 bg-navy-50 text-[#0B3D91] rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">All Feed</div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-50"></div>
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Filter by Type</span>
           </div>
           <div className="flex items-center gap-2">
              <button 
                onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
                className="p-3 text-navy-200 hover:text-[#17A2A9] transition-colors"
              >
                 <Eye size={20} />
              </button>
              <button 
                onClick={() => setNotifications([])}
                className="p-3 text-navy-200 hover:text-red-400 transition-colors"
              >
                 <Trash2 size={20} />
              </button>
           </div>
        </div>

        <div className="space-y-4">
           <AnimatePresence initial={false}>
             {notifications.length > 0 ? (
               notifications.map((notif) => {
                 const { icon: NotifIcon, color, bg } = getIcon(notif.type);
                 return (
                   <motion.div 
                     layout
                     key={notif.id}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, x: 100 }}
                     className={`p-8 rounded-[48px] border shadow-sm transition-all flex flex-col gap-6 relative group overflow-hidden ${!notif.read ? 'bg-white border-navy-900 shadow-xl shadow-gray-200' : 'bg-gray-50/50 border-gray-100 opacity-60'}`}
                   >
                     {/* Unread Left Indicator */}
                     {!notif.read && (
                       <div className="absolute top-0 bottom-0 left-0 w-3 bg-[#0B3D91]"></div>
                     )}

                     <div className="flex justify-between items-start relative z-10">
                        <div className="flex items-center gap-6">
                           <div className={`w-14 h-14 rounded-3xl flex items-center justify-center border-4 border-white shadow-2xl transition-all ${bg} ${color}`}>
                              <NotifIcon size={24} strokeWidth={3} />
                           </div>
                           <div className="flex flex-col gap-1">
                              <h4 className="text-xl font-black text-navy-900 leading-none group-hover:translate-x-1 transition-transform tracking-tight">{notif.title}</h4>
                              <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mt-1">{notif.time}</p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           <button onClick={() => markAsRead(notif.id)} className={`p-2 transition-colors ${notif.read ? 'text-[#17A2A9]' : 'text-gray-100'}`}>
                              <CheckCircle size={20} strokeWidth={3} />
                           </button>
                           <button onClick={() => deleteNotif(notif.id)} className="p-2 text-gray-100 hover:text-red-400 transition-colors">
                              <Trash2 size={20} />
                           </button>
                        </div>
                     </div>

                     <div className="pl-20 border-t border-gray-50 border-dashed pt-6 mt-2 relative z-10">
                        <p className="text-gray-400 text-sm font-semibold leading-relaxed max-w-[280px]">{notif.message}</p>
                        
                        <div className="flex items-center gap-4 mt-6">
                           <button className="flex items-center gap-2 px-6 py-2 bg-[#F6F8FA] rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#0B3D91] shadow-sm border border-white hover:bg-navy-50 active:scale-95 transition-all">
                              <MessageSquare size={14} /> Open Message
                           </button>
                           <button className="flex items-center gap-2 px-6 py-2 bg-[#F6F8FA] rounded-2xl text-[9px] font-black uppercase tracking-widest text-teal-600 shadow-sm border border-white hover:bg-teal-50 active:scale-95 transition-all">
                              <History size={14} /> Journey Logs
                           </button>
                        </div>
                     </div>
                   </motion.div>
                 );
               })
             ) : (
               <div className="py-24 flex flex-col items-center justify-center text-center px-12 opacity-40 grayscale group">
                  <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-10 border-8 border-gray-50 relative overflow-hidden shadow-2xl">
                     <Bell size={64} className="text-gray-100 active:rotate-12 transition-transform" />
                  </div>
                  <h3 className="text-3xl font-black text-navy-900 mb-4 tracking-tighter">Inbox is clear</h3>
                  <p className="text-sm font-black text-gray-300 uppercase tracking-widest leading-loose max-w-[280px]">No new alerts or system updates for you at the moment.</p>
               </div>
             )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}