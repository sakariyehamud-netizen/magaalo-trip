import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, User, Truck, MapPin, ChevronRight, Search, Filter, MoreVertical, Eye, EyeOff, Trash2, Award, Award as AwardIcon, Info } from 'lucide-react';

const MOCK_REVIEWS = [
  { id: 1, passenger: 'Safar Hersi', rating: 5, comment: 'Excellent service! The bus was clean and the driver was professional.', driver: 'Dahir Hassan', route: 'HGE → BER', date: 'Oct 24, 2024', status: 'Public' },
  { id: 2, passenger: 'Nimco Ali', rating: 4, comment: 'Good trip, but slightly delayed due to traffic.', driver: 'Nimco Ali', route: 'BER → HGE', date: 'Oct 24, 2024', status: 'Public' },
  { id: 3, passenger: 'Abdi Bile', rating: 3, comment: 'AC was a bit weak in the back seats.', driver: 'Abdi Bile', route: 'GAR → BOS', date: 'Oct 23, 2024', status: 'Hidden' },
  { id: 4, passenger: 'Fozia Faris', rating: 5, comment: 'Best travel experience in the region. Highly recommend!', driver: 'Fozia Faris', route: 'MOG → BAI', date: 'Oct 23, 2024', status: 'Public' },
];

export default function AdminReviews() {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [search, setSearch] = useState('');

  const toggleVisibility = (id) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'Public' ? 'Hidden' : 'Public' } : r));
  };

  return (
    <div className="space-y-12">
      {/* Metrics Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-teal-50/40 transition-colors pointer-events-none"></div>
            
            <div className="flex items-center gap-8 relative z-10 w-full">
               <div className="w-20 h-20 bg-[#17A2A9] rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-teal-100 border-4 border-white transform rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 ring-2 ring-gray-50">
                  <Star size={36} strokeWidth={3} className="fill-white" />
               </div>
               <div className="flex flex-col gap-1 flex-1">
                  <h1 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">Reputation Audit</h1>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mt-2">Global Customer Feedback Center</p>
               </div>
            </div>

            <div className="flex flex-col items-center gap-2 relative z-10 bg-[#F6F8FA] p-6 rounded-[40px] border-4 border-white shadow-inner-lg min-w-[200px]">
               <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={20} className={s <= 4.8 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-100 fill-gray-100'} strokeWidth={3} />
                  ))}
               </div>
               <span className="text-3xl font-black text-navy-900 leading-none tracking-tighter mt-1">4.82</span>
               <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest leading-none">Net Platform Score</span>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col justify-center gap-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-40 h-40 bg-navy-50/20 rounded-full -ml-20 -mt-20 blur-2xl group-hover:bg-navy-50/40 transition-colors pointer-events-none"></div>
            
            <div className="flex flex-col items-center text-center gap-2 relative z-10">
               <div className="w-16 h-16 bg-navy-50 rounded-[28px] flex items-center justify-center text-[#0B3D91] border-4 border-white shadow-xl mb-2 group-hover:scale-110 transition-transform">
                  <Award size={32} strokeWidth={3} className="fill-[#0B3D91]/5" />
               </div>
               <h4 className="text-xl font-black text-navy-900 tracking-tighter leading-none">Elite Fleet</h4>
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-tight max-w-[140px]">Top performance across 9 countries</p>
            </div>
         </div>
      </div>

      {/* Main Reviews Feed Section */}
      <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-2">
            <div className="relative group w-full md:w-[480px]">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2A9] transition-colors">
                  <Search size={22} strokeWidth={3} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search by passenger, driver or id..." 
                 className="w-full pl-16 pr-6 py-5 bg-[#F6F8FA] border-2 border-transparent rounded-[32px] text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50"
               />
            </div>
            <div className="flex gap-4 w-full md:w-fit overflow-x-auto no-scrollbar pb-1">
               {['All Feedback', 'Unverified', 'Resolved', 'Archived'].map((f) => (
                 <button key={f} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${f === 'All Feedback' ? 'bg-navy-900 text-white shadow-xl translate-y-[-1px]' : 'bg-[#F6F8FA] text-gray-300 border-2 border-transparent hover:bg-gray-100'}`}>
                    {f}
                 </button>
               ))}
            </div>
         </div>

         {/* Reviews Card Grid */}
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            <AnimatePresence mode="wait">
               {reviews.map((rev, idx) => (
                 <motion.div 
                   key={rev.id}
                   layout
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: idx * 0.05 }}
                   className="bg-[#F6F8FA] rounded-[56px] p-2 hover:bg-white border-4 border-transparent hover:border-[#F6F8FA] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 group relative active:scale-[0.99]"
                 >
                    <div className="bg-white rounded-[40px] p-10 flex flex-col gap-10 relative overflow-hidden group-hover:shadow-inner group-hover:shadow-gray-100 transition-all">
                       <div className="flex justify-between items-start relative z-10">
                          <div className="flex items-center gap-6">
                             <div className="w-16 h-16 rounded-[28px] bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] flex items-center justify-center text-white text-xl font-black border-4 border-white shadow-2xl group-hover:rotate-6 transition-transform">
                                {rev.passenger.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div className="flex flex-col gap-1.5">
                                <h3 className="text-xl font-black text-navy-900 leading-none group-hover:translate-x-1 transition-transform tracking-tight">{rev.passenger}</h3>
                                <div className="flex items-center gap-3">
                                   <div className="flex gap-1 bg-yellow-400 font-orange-50 px-2 py-0.5 rounded-lg border border-yellow-100 shadow-sm">
                                      {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={10} className={i < rev.rating ? 'text-white fill-white' : 'text-white/20 fill-white/20'} strokeWidth={3} />
                                      ))}
                                   </div>
                                   <div className="w-1.5 h-1.5 rounded-full bg-gray-50 ring-2 ring-gray-100"></div>
                                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mt-1">{rev.date}</span>
                                </div>
                             </div>
                          </div>
                          <div className={`px-4 py-2 rounded-2xl border-2 border-white shadow-sm flex items-center gap-2 transition-all ${rev.status === 'Public' ? 'bg-teal-50 text-teal-600' : 'bg-rose-50 text-rose-500 grayscale'}`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${rev.status === 'Public' ? 'bg-[#17A2A9] animate-pulse' : 'bg-red-500'}`}></div>
                             <span className="text-[9px] font-black uppercase tracking-widest mt-0.5">{rev.status}</span>
                          </div>
                       </div>

                       <div className="bg-gray-50/50 p-6 rounded-[32px] border-2 border-white shadow-inner-lg group-hover:bg-white group-hover:border-[#F6F8FA] transition-all">
                          <p className="text-gray-400 text-sm font-semibold italic leading-relaxed tracking-tight group-hover:text-navy-900 transition-colors">"{rev.comment}"</p>
                       </div>

                       <div className="flex items-center justify-between pt-4 border-t border-gray-50 border-dashed relative z-10 w-full">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-teal-600 border shadow-sm group-hover:bg-navy-50 group-hover:text-[#0B3D91] transition-all">
                                <Truck size={20} strokeWidth={2.5} />
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 text-[8px]">Linked Operator</span>
                                <span className="text-sm font-black text-navy-900 leading-none group-hover:text-indigo-500 transition-colors uppercase tracking-widest text-[11px]">{rev.driver}</span>
                             </div>
                          </div>
                          <div className="flex gap-2">
                             <button 
                                onClick={() => toggleVisibility(rev.id)}
                                className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 transition-all active:scale-95 group/btn ${rev.status === 'Public' ? 'text-gray-300 hover:text-[#0B3D91]' : 'text-[#17A2A9] hover:text-[#17A2A9]'}`}
                             >
                                {rev.status === 'Public' ? <EyeOff size={20} strokeWidth={2.5} /> : <Eye size={20} strokeWidth={2.5} />}
                             </button>
                             <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-100 hover:text-red-500 shadow-sm border border-gray-50 transition-all active:scale-95 group/btn"><Trash2 size={20} strokeWidth={2.5} /></button>
                             <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-100 hover:text-[#0B3D91] shadow-sm border border-gray-50 transition-all active:scale-95 group/btn"><MoreVertical size={20} strokeWidth={2.5} /></button>
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>

         <div className="py-10 flex flex-col items-center gap-6 opacity-30 group cursor-default">
            <div className="flex gap-2">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="w-2.5 h-2.5 rounded-full bg-gray-200 group-hover:bg-[#17A2A9] transition-all" style={{ transitionDelay: `${i * 0.1}s` }}></div>
               ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 group-hover:text-navy-900 transition-colors">Manifest History Archive Node · Secure Cloud Root</p>
         </div>
      </div>
    </div>
  );
}