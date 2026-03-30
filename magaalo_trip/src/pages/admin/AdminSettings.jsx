import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Bell, CreditCard, Users, Globe, Smartphone, Lock, Info, ChevronRight, Save, Trash2, Award, Truck, MapPin } from 'lucide-react';

const SETTINGS_SECTIONS = [
  { id: 'branding', label: 'Platform Branding', icon: Award, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { id: 'fleet', label: 'Fleet Configuration', icon: Truck, color: 'text-[#17A2A9]', bg: 'bg-teal-50' },
  { id: 'payouts', label: 'Financial Ecosystem', icon: CreditCard, color: 'text-navy-900', bg: 'bg-navy-50' },
  { id: 'global', label: 'Regional Settings', icon: Globe, color: 'text-rose-500', bg: 'bg-rose-50' },
];

export default function AdminSettings() {
  return (
    <div className="space-y-12 pb-24">
      {/* Page Context Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-navy-50/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-navy-50/40 transition-colors pointer-events-none"></div>
         
         <div className="flex items-center gap-8 relative z-10 w-full">
            <div className="w-20 h-20 bg-navy-900 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-navy-100 border-4 border-white transform rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 ring-2 ring-gray-50">
               <Settings size={36} strokeWidth={3} className="animate-spin-slow" />
            </div>
            <div className="flex flex-col gap-1 flex-1">
               <h1 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">System Architecture</h1>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-2">Global Platform Intelligence Access</p>
            </div>
         </div>

         <div className="flex gap-4 relative z-10 w-full lg:w-fit">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-[#17A2A9] text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-teal-100 active:scale-95 transition-all group/btn">
               <Save size={20} strokeWidth={4} className="group-hover/btn:rotate-12 transition-transform duration-500" />
               Update Framework
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Vertical Nav Matrix */}
         <div className="lg:col-span-1 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 flex flex-col gap-6 border border-gray-50 h-fit">
            <h3 className="text-2xl font-black text-navy-900 tracking-tighter mb-4 px-2">Settings Hub</h3>
            {SETTINGS_SECTIONS.map((section) => (
              <button 
                key={section.id} 
                className={`w-full group flex items-center justify-between p-6 rounded-[32px] p-6 hover:bg-gray-50 transition-all border-4 border-transparent hover:border-white hover:shadow-xl active:scale-95 outline-none ${section.id === 'branding' ? 'bg-[#F6F8FA] border-white shadow-inner-lg' : ''}`}
              >
                 <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-3xl ${section.bg} ${section.color} flex items-center justify-center border-4 border-white shadow-xl transition-all group-hover:rotate-6`}>
                       <section.icon size={24} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-black text-navy-900 uppercase tracking-widest text-[11px] group-hover:translate-x-1 transition-transform">{section.label}</span>
                 </div>
                 <ChevronRight size={18} className="text-gray-100 group-hover:text-[#17A2A9] transition-colors" />
              </button>
            ))}
            
            <div className="mt-20 pt-10 border-t border-gray-50 border-dashed">
               <button className="w-full p-8 bg-white border-4 border-red-50 text-red-400 font-black uppercase tracking-[0.4em] text-[10px] rounded-[40px] shadow-2xl shadow-red-900/5 group hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 outline-none">
                  Reset Node Manifest
               </button>
            </div>
         </div>

         {/* Configuration Blade */}
         <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-12 relative overflow-hidden group">
               <div className="flex justify-between items-center px-4 relative z-10">
                  <div className="flex flex-col gap-1">
                     <h2 className="text-3xl font-black text-navy-900 tracking-tighter">Core Identity</h2>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Global Branding Framework settings</p>
                  </div>
                  <Info size={24} className="text-gray-200" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 px-4">
                  <div className="space-y-4">
                     <label className="text-xs font-black text-gray-300 uppercase tracking-widest ml-1">Platform Name</label>
                     <input 
                       type="text" 
                       defaultValue="Magaalo Trip Ecosystem"
                       className="w-full p-6 bg-[#F6F8FA] border-4 border-transparent rounded-[32px] text-navy-900 font-black focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner-lg"
                     />
                  </div>
                  <div className="space-y-4">
                     <label className="text-xs font-black text-gray-300 uppercase tracking-widest ml-1">Primary Support Node</label>
                     <input 
                       type="text" 
                       defaultValue="hge-hq-01.magaalo.io"
                       className="w-full p-6 bg-[#F6F8FA] border-4 border-transparent rounded-[32px] text-navy-900 font-black focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner-lg"
                     />
                  </div>
               </div>
               
               <div className="px-4 space-y-8 relative z-10 pt-4">
                  <div className="flex justify-between items-center group/tog active:scale-[0.99] transition-all cursor-pointer">
                     <div className="flex flex-col gap-1">
                        <span className="text-base font-black text-navy-900 leading-none">Global Dark Mode Auto-Switch</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 opacity-60">Sync platform UI with regional sunrise/sunset cycles</span>
                     </div>
                     <div className="w-16 h-10 bg-[#17A2A9]/20 rounded-full p-1.5 relative border border-teal-100/50">
                        <div className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-[#17A2A9] rounded-full shadow-lg shadow-teal-500/30"></div>
                     </div>
                  </div>
                  <div className="flex justify-between items-center group/tog active:scale-[0.99] transition-all cursor-pointer opacity-50">
                     <div className="flex flex-col gap-1">
                        <span className="text-base font-black text-navy-900 leading-none">Extended Fleet API Permissions</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 opacity-60">Allow 3rd-party logistics access to telemetery nodes</span>
                     </div>
                     <div className="w-16 h-10 bg-gray-100 rounded-full p-1.5 relative border border-gray-200 shadow-inner">
                        <div className="absolute left-1.5 top-1.5 bottom-1.5 aspect-square bg-white rounded-full shadow-sm"></div>
                     </div>
                  </div>
               </div>
               
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#F6F8FA]/50 rounded-full -mr-16 -mt-16 border-8 border-white opacity-40 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-12 relative overflow-hidden group">
               <div className="flex justify-between items-center px-4 relative z-10">
                  <div className="flex flex-col gap-1">
                     <h2 className="text-3xl font-black text-navy-900 tracking-tighter">Security Protocol</h2>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Root node encryption & identity logic</p>
                  </div>
                  <Lock size={24} className="text-gray-200" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 px-4">
                  <div className="space-y-4">
                     <label className="text-xs font-black text-gray-300 uppercase tracking-widest ml-1">Admin Passkey Rotation</label>
                     <div className="relative">
                        <input 
                          type="password" 
                          defaultValue="••••••••••••••••"
                          className="w-full p-6 bg-[#F6F8FA] border-4 border-transparent rounded-[32px] text-navy-900 font-black focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner-lg"
                        />
                        <button className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-white rounded-xl shadow-sm border border-gray-50 text-gray-300 hover:text-navy-900 transition-colors"><ChevronRight size={18} /></button>
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-xs font-black text-gray-300 uppercase tracking-widest ml-1">Fleet Auth Token</label>
                     <div className="relative">
                        <input 
                          type="text" 
                          defaultValue="v2-auth-f921-998"
                          className="w-full p-6 bg-[#F6F8FA] border-4 border-transparent rounded-[32px] text-navy-900 font-black focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner-lg"
                        />
                        <button className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-white rounded-xl shadow-sm border border-gray-50 text-gray-300 hover:text-navy-900 transition-colors"><Check size={18} /></button>
                     </div>
                  </div>
               </div>

               <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50 rounded-full -ml-16 -mt-16 border-8 border-white opacity-40 group-hover:opacity-100 transition-opacity"></div>
            </div>
         </div>
      </div>
    </div>
  );
}

function Check({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}