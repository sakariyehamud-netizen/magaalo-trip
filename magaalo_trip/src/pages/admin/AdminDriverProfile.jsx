import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Award, Star, Truck, Info, Activity, MapPin, Phone, Mail, ShieldCheck, Zap, TrendingUp, Calendar, ArrowRight, AlertTriangle } from 'lucide-react';

const MOCK_DRIVERS = [
  { id: 1, name: 'Dahir Hassan', license: 'SOM/DR-99214', rating: 4.98, trips: 142, status: 'On Trip', email: 'dahir@magaalo.com', phone: '+252 63 444111', bus: 'MT-V0914' },
  { id: 2, name: 'Nimco Ali', license: 'SOM/DR-88512', rating: 4.85, trips: 112, status: 'Active', email: 'nimco@magaalo.com', phone: '+252 63 555222', bus: 'MT-S1121' },
  { id: 3, name: 'Abdi Bile', license: 'SOM/DR-77410', rating: 4.70, trips: 89, status: 'Inactive', email: 'abdi@magaalo.com', phone: '+252 63 666333', bus: 'MT-E2045' },
  { id: 4, name: 'Fozia Faris', license: 'SOM/DR-66308', rating: 4.92, trips: 210, status: 'Active', email: 'fozia@magaalo.com', phone: '+252 63 777444', bus: 'MT-B3056' },
];

export default function AdminDriverProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const driver = MOCK_DRIVERS.find(d => d.id === parseInt(id));

  if (!driver) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8">
         <div className="w-24 h-24 bg-red-50 rounded-[32px] flex items-center justify-center text-red-500 shadow-xl border-4 border-white shadow-red-100">
            <AlertTriangle size={40} strokeWidth={3} />
         </div>
         <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-navy-900 tracking-tighter">Pilot Not Found</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">The requested operational ID does not exist</p>
         </div>
         <button 
           onClick={() => navigate('/admin/drivers')}
           className="px-10 py-5 bg-navy-900 text-white rounded-[28px] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-navy-200 active:scale-95 transition-all"
         >
            Return to Personnel Database
         </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Dynamic Breadcrumb Header */}
      <div className="flex items-center gap-4 px-2">
         <button 
           onClick={() => navigate(-1)}
           className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-navy-900 border-2 border-transparent hover:border-white hover:bg-white hover:shadow-xl transition-all active:scale-90"
         >
           <ChevronLeft size={24} strokeWidth={3} />
         </button>
         <div className="flex flex-col">
            <h1 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] leading-none mb-2">Personnel Intelligence</h1>
            <div className="flex items-center gap-3">
               <span className="text-2xl font-black text-navy-900 tracking-tighter capitalize">{driver.name}</span>
               <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
               <span className="text-sm font-black text-indigo-500 uppercase tracking-widest leading-none">Global Profile</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Left Column: Identity Card */}
         <div className="lg:col-span-1 space-y-10">
            <div className="bg-navy-900 p-12 rounded-[60px] shadow-2xl shadow-navy-200 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#17A2A9]/20 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none group-hover:bg-[#17A2A9]/40 transition-colors duration-1000"></div>
               
               <div className="flex flex-col items-center text-center gap-8 relative z-10">
                  <div className="relative">
                     <div className="w-44 h-44 rounded-[64px] bg-white text-navy-900 flex items-center justify-center text-6xl font-black shadow-2xl border-[10px] border-navy-800 ring-4 ring-white/10 group-hover:rotate-3 transition-transform duration-500">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-[#17A2A9] rounded-2xl border-4 border-navy-900 flex items-center justify-center shadow-xl">
                        <ShieldCheck size={24} className="text-white" />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <h2 className="text-3xl font-black text-white tracking-tighter leading-none">{driver.name}</h2>
                     <p className="text-white/40 text-[10px] uppercase font-black tracking-[0.4em]">Official Operational ID</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full pt-4">
                     <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-col items-center gap-2 group/stat hover:bg-white/10 transition-colors">
                        <Star size={20} className="text-yellow-400 fill-yellow-400 group-hover/stat:animate-bounce" />
                        <span className="text-2xl font-black text-white">{driver.rating}</span>
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Global Rank</span>
                     </div>
                     <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-col items-center gap-2 group/stat hover:bg-white/10 transition-colors">
                        <TrendingUp size={20} className="text-teal-400 group-hover/stat:rotate-12 transition-transform" />
                        <span className="text-2xl font-black text-white">{driver.trips}</span>
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Total Trips</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
               <h3 className="text-xl font-black text-navy-900 tracking-tighter px-2">Contact Nexus</h3>
               <div className="space-y-8 px-2">
                  <div className="flex items-center gap-6 group cursor-pointer">
                     <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 border-2 border-white shadow-sm ring-2 ring-gray-50 group-hover:text-indigo-500 transition-all">
                        <Phone size={20} strokeWidth={3} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Secure Line</span>
                        <span className="text-base font-black text-navy-900 group-hover:translate-x-1 transition-transform">{driver.phone}</span>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 group cursor-pointer">
                     <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 border-2 border-white shadow-sm ring-2 ring-gray-50 group-hover:text-[#17A2A9] transition-all">
                        <Mail size={20} strokeWidth={3} />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Digital Protocol</span>
                        <span className="text-base font-black text-navy-900 group-hover:translate-x-1 transition-transform">{driver.email}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Middle + Right Column: Operations Data */}
         <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 space-y-12">
               <div className="flex justify-between items-center px-2">
                  <div className="flex flex-col gap-1">
                     <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Operational Telemetry</h3>
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Real-time performance audit</p>
                  </div>
                  <Zap size={24} className="text-teal-400 animate-pulse" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-2">
                  <div className="bg-[#F6F8FA] p-8 rounded-[48px] border-4 border-white shadow-inner flex flex-col gap-6 relative overflow-hidden group/box">
                     <Activity size={48} className="absolute -right-4 -bottom-4 text-navy-900/5 rotate-[-15deg] group-hover/box:rotate-0 transition-transform duration-700" />
                     <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none">Current Assignment</span>
                     <div className="flex flex-col gap-2 relative z-10">
                        <p className="text-3xl font-black text-navy-900 leading-none tracking-tighter">Hargeisa → Borama</p>
                        <p className="text-sm font-black text-gray-400 mt-2 flex items-center gap-2">
                           <Bus size={14} className="text-[#17A2A9]" /> MT-V{driver.id}V914 · VIP Coach
                        </p>
                     </div>
                     <div className="flex gap-4 pt-4 relative z-10">
                        <div className="bg-teal-50 px-4 py-2 rounded-xl text-[10px] font-black text-teal-600 uppercase tracking-widest border border-teal-100 shadow-sm animate-bounce">
                           On-Time
                        </div>
                        <div className="bg-white px-4 py-2 rounded-xl text-[10px] font-black text-navy-900 uppercase tracking-widest border border-gray-100 shadow-sm flex items-center gap-2">
                           <MapPin size={10} /> 42km to terminal
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                     <div className="bg-white p-8 rounded-[36px] border-2 border-gray-50 flex items-center justify-between group hover:shadow-xl transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 border-2 border-white shadow-xl">
                              <Calendar size={20} strokeWidth={3} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Next Link</span>
                              <span className="text-base font-black text-navy-900">Tomorrow · 08:30 AM</span>
                           </div>
                        </div>
                        <ArrowRight size={20} className="text-gray-100 group-hover:text-indigo-100 transition-colors" />
                     </div>
                     <div className="bg-white p-8 rounded-[36px] border-2 border-gray-50 flex items-center justify-between group hover:shadow-xl transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-500 border-2 border-white shadow-xl">
                              <Award size={20} strokeWidth={3} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Operational Tier</span>
                              <span className="text-base font-black text-navy-900 tracking-widest text-[13px] uppercase">Elite Partner</span>
                           </div>
                        </div>
                        <ArrowRight size={20} className="text-gray-100 group-hover:text-teal-100 transition-colors" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 space-y-12">
               <div className="flex justify-between items-center px-2">
                  <div className="flex flex-col gap-1">
                     <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Engagement Database</h3>
                     <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Recent passenger feedback</p>
                  </div>
                  <Download size={24} className="text-gray-200" />
               </div>

               <div className="space-y-6 px-2">
                  {[
                    { author: 'Ahmed W.', note: 'Excellent navigation and communication during the mountain pass.', stars: 5, date: '2 days ago' },
                    { author: 'Samira O.', note: 'Very professional, arrived 10 minutes early at the arrival terminal.', stars: 5, date: '4 days ago' },
                  ].map((rev, idx) => (
                    <div key={idx} className="bg-[#F6F8FA] p-8 rounded-[48px] border-4 border-white shadow-inner flex flex-col gap-4 group/rev">
                       <div className="flex justify-between items-start">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-2xl bg-white border-2 border-gray-50 flex items-center justify-center text-navy-900 font-black text-xs shadow-sm">
                                {rev.author.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div className="flex flex-col">
                                <span className="text-base font-black text-navy-900 tracking-tighter">{rev.author}</span>
                                <div className="flex items-center gap-1 mt-0.5">
                                   {[1,2,3,4,5].map(s => <Star key={s} size={8} className="text-yellow-400 fill-yellow-400" />)}
                                </div>
                             </div>
                          </div>
                          <span className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">{rev.date}</span>
                       </div>
                       <p className="text-sm font-black text-navy-900/60 leading-relaxed group-hover/rev:text-navy-900 transition-colors">"{rev.note}"</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function Bus({ size, className }) {
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
         <path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1 1-2V7s0-1-1-1h-3"/><path d="M3 18h3s1-1 1-2V7s0-1-1-1H3s-1 0-1 1v9s0 2 1 2Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
      </svg>
   );
}
