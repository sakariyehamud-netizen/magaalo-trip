import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Star, Award, Shield, LogOut, ChevronRight, Settings, Smartphone, Bell, History, FileText, Bus, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DRIVER_PROFILE_ITEMS = [
  { id: 'bus_info', label: 'Assigned Vehicle', icon: Bus, detail: 'MT-V0914 · Premium', color: 'bg-navy-50 text-[#0B3D91]' },
  { id: 'license', label: 'Driver License', icon: FileText, detail: 'Exp: 24 Oct, 2026', color: 'bg-teal-50 text-[#17A2A9]' },
  { id: 'history', label: 'Journey Logs', icon: History, detail: '142 Trips Logged', color: 'bg-indigo-50 text-indigo-500' },
  { id: 'security', label: 'Device Security', icon: Smartphone, detail: 'Last login Hargeisa', color: 'bg-rose-50 text-rose-500' },
  { id: 'notif', label: 'Push Notifications', icon: Bell, detail: 'Enabled (Sound)', color: 'bg-amber-50 text-amber-500' },
];

export default function DriverProfile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-24">
      {/* Upper Profile Context */}
      <div className="brand-gradient pt-16 pb-24 px-8 rounded-b-[60px] relative overflow-hidden text-white shadow-2xl shadow-navy-900/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl"></div>
        
        <div className="flex flex-col items-center text-center relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 rounded-[48px] bg-white p-2 shadow-2xl shadow-navy-900/40 relative group"
          >
            <div className="w-full h-full rounded-[40px] bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] flex items-center justify-center text-white text-4xl font-black border-4 border-navy-50">
              DH
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#17A2A9] rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg pointer-events-none">
              <Shield size={18} strokeWidth={3} />
            </div>
          </motion.div>

          <h2 className="text-3xl font-black mt-6 tracking-tight flex items-center gap-2">
            Dahir Hassan <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center border border-white/20"><Award size={14} className="text-teal-400" /></div>
          </h2>
          <div className="flex items-center gap-3 mt-2 text-white/50">
             <span className="text-[10px] font-black uppercase tracking-widest leading-none">License ID · SOM/DR-99214A</span>
             <div className="w-1 h-1 bg-white/40 rounded-full"></div>
             <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-black text-white">4.98</span>
             </div>
          </div>

          <div className="w-full grid grid-cols-3 gap-4 mt-10">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black leading-none">142</span>
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Total Trips</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-white/10 px-4">
              <span className="text-2xl font-black leading-none">$12k+</span>
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Total Earnings</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black leading-none">2.4k</span>
              <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Active Hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Controls Box */}
      <div className="px-8 -mt-12 relative z-20 space-y-6">
        <div className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/50 p-10 space-y-10 border-4 border-gray-50">
           <div className="space-y-4">
              <div className="flex justify-between items-center mb-4 px-2">
                 <h3 className="text-lg font-black text-navy-900 tracking-tighter">Driver Management</h3>
                 <button onClick={() => navigate('/')} className="p-3 bg-gray-50 rounded-2xl text-navy-400 hover:bg-navy-50 transition-all"><Settings size={20} /></button>
              </div>

              {DRIVER_PROFILE_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button 
                    key={item.id}
                    className="w-full group flex items-center justify-between p-6 rounded-[32px] hover:bg-gray-50 hover:px-8 border-2 border-transparent hover:border-gray-100 transition-all active:scale-[0.98] outline-none"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all ${item.color} shadow-sm group-hover:shadow-md border-4 border-white ring-2 ring-gray-50`}>
                         <Icon size={24} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col items-start gap-1 transform transition-transform group-hover:translate-x-1">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 group-hover:text-navy-900 transition-colors">{item.label}</span>
                        <span className="text-base font-black text-navy-900 group-hover:text-[#17A2A9] transition-colors">{item.detail}</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-100 group-hover:text-navy-900 transition-colors" />
                  </button>
                );
              })}
           </div>

           <div className="space-y-4 pt-10 border-t border-gray-50 border-dashed">
              <div className="flex justify-between items-center px-2">
                 <h3 className="text-lg font-black text-navy-900 tracking-tighter">Account Status</h3>
                 <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-500 rounded-2xl border-2 border-white shadow-sm ring-2 ring-green-100">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Active Partner</span>
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/')} 
                className="w-full flex items-center justify-center gap-6 p-8 bg-white border-4 border-red-50 rounded-[40px] text-red-500 font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-red-900/5 group hover:bg-red-50 active:scale-95 transition-all outline-none"
              >
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner">
                   <LogOut size={20} strokeWidth={3} />
                </div>
                Terminate Current Session
              </button>
           </div>
        </div>

        <div className="flex flex-col items-center text-center gap-4 py-10 opacity-20">
           <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-xl bg-[#0B3D91] flex items-center justify-center text-white text-[10px] font-black">MT</div>
             <span className="font-black text-navy-900 tracking-tighter text-sm uppercase">Driver Ecosystem v2.0</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest leading-none">Security Hardware Locked · Somali Land (HGE)</p>
        </div>
      </div>
    </div>
  );
}