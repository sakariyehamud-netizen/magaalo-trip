import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CreditCard, HelpCircle, LogOut, ChevronRight, Settings, User, MapPin, Globe, CreditCard as Card, Wallet } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const PROFILE_ITEMS = [
  { id: 'personal', label: 'Personal Information', icon: User, color: 'navy' },
  { id: 'payment', label: 'Payment Methods', icon: Card, color: 'teal' },
  { id: 'history', label: 'Ride History', icon: MapPin, color: 'indigo' },
  { id: 'lang', label: 'Language Settings', icon: Globe, color: 'amber' },
  { id: 'notif', label: 'Push Notifications', icon: Bell, color: 'rose' },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, color: 'cyan' },
];

export default function PassengerProfile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-24">
      {/* Upper Profile Box */}
      <div className="brand-gradient pt-16 pb-24 px-8 rounded-b-[60px] relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl"></div>
        
        <div className="flex flex-col items-center text-center relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 rounded-[48px] bg-white p-2 shadow-2xl shadow-navy-900/40 relative group"
          >
            <div className="w-full h-full rounded-[40px] bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] flex items-center justify-center text-white text-4xl font-black border-4 border-navy-50">
              SH
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-teal-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg pointer-events-none">
              <Settings size={18} />
            </div>
          </motion.div>

          <h2 className="text-3xl font-black mt-6 tracking-tight">Safar Hersi</h2>
          <p className="text-white/70 text-sm font-semibold tracking-wide uppercase mt-1">Passenger ID · MT-V881-A</p>

          <div className="w-full grid grid-cols-3 gap-4 mt-10">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black leading-none">12</span>
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Trips</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-white/10 px-4">
              <span className="text-2xl font-black leading-none">$145</span>
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Spent</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black leading-none">4.9</span>
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings Box */}
      <div className="px-6 -mt-12 relative z-20 space-y-6">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-gray-200/50 p-6 space-y-2">
           {PROFILE_ITEMS.map((item, idx) => {
             const Icon = item.icon;
             return (
               <button 
                 key={item.id}
                 className="w-full group flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-all active:scale-[0.98]"
               >
                 <div className="flex items-center gap-5">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-50/80 border-2 border-white shadow-sm text-gray-400 group-hover:text-navy-900 group-hover:bg-white group-hover:shadow-md transition-all`}>
                      <Icon size={22} strokeWidth={2.5} />
                   </div>
                   <span className="text-sm font-black text-gray-500 group-hover:text-navy-900 transition-colors uppercase tracking-widest text-[11px]">{item.label}</span>
                 </div>
                 <ChevronRight size={18} className="text-gray-200 group-hover:text-navy-900 transition-colors" />
               </button>
             );
           })}
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="w-full flex items-center justify-center gap-3 p-6 bg-red-50 rounded-[32px] text-red-500 font-extrabold uppercase tracking-widest text-[11px] shadow-sm hover:bg-red-100 transition-colors border-2 border-dashed border-red-100/50 active:scale-[0.98]"
        >
          <LogOut size={20} strokeWidth={3} />
          Sign Out of Account
        </button>

        <div className="flex flex-col items-center text-center gap-4 py-8 opacity-20">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] flex items-center justify-center text-white text-[10px] font-black">MT</div>
             <span className="font-black text-navy-900 tracking-tighter text-sm uppercase">Magaalo Trip Ecosystem</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest">Beta Version 1.0.4.A</p>
        </div>
      </div>
    </div>
  );
}