import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, QrCode, Ticket, MapPin, Bus, User, ChevronLeft, ArrowRight, Share2, Download, ShieldCheck } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Confetti = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(24)].map((_, i) => (
        <motion.div
           key={i}
           initial={{ 
             x: Math.random() * 800, 
             y: -50, 
             rotate: 0,
             opacity: 1,
             scale: 0.5 + Math.random()
           }}
           animate={{ 
             y: [null, 900], 
             x: [null, (Math.random() - 0.5) * 200 + i * 20],
             rotate: 720,
             opacity: 0
           }}
           transition={{ 
             duration: 3 + Math.random() * 3, 
             ease: [0.22, 1, 0.36, 1],
             repeat: Infinity,
             delay: Math.random() * 2
           }}
           style={{ 
             width: 12, 
             height: 12, 
             backgroundColor: ['#0B3D91', '#17A2A9', '#6366f1', '#14b8a6', '#4f46e5'][i % 5],
             borderRadius: i % 4 === 0 ? '50%' : '3px'
           }}
        />
      ))}
    </div>
  );
};

export default function TicketConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    setTicketId('MTX-' + Math.random().toString(36).substring(2, 9).toUpperCase());
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] rounded-b-[100px] shadow-2xl shadow-indigo-100" />
      <Confetti />
      
      <div className="flex flex-col items-center px-8 pt-20 pb-24 relative z-10">
        {/* Success Identity Area */}
        <div className="flex flex-col items-center text-center mb-12">
           <motion.div 
             initial={{ scale: 0, rotate: -45 }}
             animate={{ scale: 1, rotate: 0 }}
             transition={{ type: "spring", damping: 15, stiffness: 200 }}
             className="w-28 h-28 bg-white rounded-[40px] flex items-center justify-center text-teal-500 shadow-2xl shadow-navy-900/40 mb-8 border-8 border-white/20 relative"
           >
              <div className="absolute inset-0 bg-teal-500 rounded-[32px] opacity-10 animate-ping" />
              <Check size={56} strokeWidth={4} className="relative z-10" />
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="space-y-2"
           >
              <h1 className="text-4xl font-black text-white tracking-tighter leading-none">Voyage Secured</h1>
              <p className="text-white/60 font-black text-[10px] uppercase tracking-[0.4em]">Digital Manifest Finalized Successfully</p>
           </motion.div>
        </div>

        {/* Tactical Manifest Card */}
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, type: "spring", damping: 25 }}
           className="w-full max-w-lg bg-white rounded-[60px] shadow-2xl shadow-gray-200 border-8 border-white overflow-hidden group"
        >
          {/* Manifest Indicator Bar */}
          <div className="flex items-center justify-between px-10 py-5 bg-[#F6F8FA] border-b-2 border-white">
             <div className="flex items-center gap-3">
                <Ticket size={18} className="text-navy-900" strokeWidth={3} />
                <span className="text-[10px] font-black text-navy-900 uppercase tracking-widest">E-Manifest Protocol</span>
             </div>
             <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-[10px] font-black text-teal-500 uppercase tracking-widest leading-none">Verified Hub</span>
             </div>
          </div>
          
          <div className="p-10 space-y-10">
            {/* Route Sector */}
            <div className="flex justify-between items-center text-left">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-black text-navy-900 tracking-tighter leading-none">HGE</span>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Hargeisa Hub</span>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 px-8 relative overflow-hidden group/route">
                 <div className="w-full flex items-center justify-between opacity-10">
                    <div className="w-2.5 h-2.5 rounded-full bg-navy-900" />
                    <div className="flex-1 border-t-2 border-dotted border-navy-900 mx-2" />
                    <div className="w-2.5 h-2.5 rounded-full bg-navy-900" />
                 </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#F6F8FA] rounded-2xl flex items-center justify-center text-navy-900 border-2 border-white shadow-inner group-hover/route:rotate-12 transition-transform">
                    <Bus size={22} strokeWidth={2.5} />
                 </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-4xl font-black text-navy-900 tracking-tighter leading-none">BER</span>
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Berbera Port</span>
              </div>
            </div>

            {/* Logical Manifest Grid */}
            <div className="grid grid-cols-2 gap-10 text-left pt-10 border-t-2 border-gray-50">
              <div className="space-y-1.5">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Operational Date</p>
                <p className="text-base font-black text-navy-900 tracking-tighter leading-none">Oct 24, 2024</p>
              </div>
              <div className="space-y-1.5 text-right">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Departure Time</p>
                <p className="text-base font-black text-navy-900 tracking-tighter leading-none">08:00 AM AST</p>
              </div>
              <div className="space-y-1.5 pt-4">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Seat Assignments</p>
                <p className="text-base font-black text-teal-600 tracking-tighter leading-none uppercase">2A · 2B</p>
              </div>
              <div className="space-y-1.5 pt-4 text-right">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Fleet Unit ID</p>
                <p className="text-base font-black text-[#0B3D91] tracking-tighter leading-none">#MT-V0914-X</p>
              </div>
            </div>

            {/* Authentication Layer */}
            <div className="flex flex-col items-center gap-6 pt-10 border-t-4 border-gray-50 border-dotted relative">
              <div className="absolute -left-16 top-0 -translate-y-1/2 w-12 h-12 rounded-full bg-[#F6F8FA] border-2 border-white shadow-inner pointer-events-none"></div>
              <div className="absolute -right-16 top-0 -translate-y-1/2 w-12 h-12 rounded-full bg-[#F6F8FA] border-2 border-white shadow-inner pointer-events-none"></div>
              
              <div className="p-8 bg-white rounded-[40px] border-4 border-gray-50 shadow-2xl relative group/qr overflow-hidden">
                 <div className="absolute inset-0 bg-navy-900 opacity-0 group-hover/qr:opacity-5 transition-opacity" />
                 <QrCode size={132} className="text-navy-900 group-hover/qr:scale-105 transition-transform duration-500" strokeWidth={1} />
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-navy-50 rounded-lg">
                   <ShieldCheck size={12} className="text-[#0B3D91]" />
                   <span className="text-[10px] font-black text-[#0B3D91] uppercase tracking-[0.2em]">{ticketId}</span>
                </div>
                <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.5em] mt-1">Unique Authentication Hash</p>
              </div>
            </div>
          </div>

          <div className="flex border-t-2 border-gray-50 scale-100">
             <button className="flex-1 py-6 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors border-r-2 border-gray-50">
                <Download size={18} className="text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Save Offline</span>
             </button>
             <button className="flex-1 py-6 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
                <Share2 size={18} className="text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Share Pass</span>
             </button>
          </div>
        </motion.div>

        {/* Global Action Grid */}
        <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          <Link 
            to={`/passenger/live-tracking/${id}`}
            className="group flex flex-col items-center justify-center gap-3 p-8 rounded-[40px] bg-white border-4 border-white shadow-2xl shadow-gray-200/50 hover:border-teal-400/20 active:scale-95 transition-all text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -mr-12 -mt-12 transition-colors group-hover:bg-teal-100" />
            <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 relative z-10 group-hover:scale-110 group-hover:rotate-6 transition-transform">
               <MapPin size={28} strokeWidth={2.5} />
            </div>
            <div className="relative z-10 space-y-1">
               <span className="text-sm font-black text-navy-900 tracking-tighter leading-none block uppercase">Fleet Tracker</span>
               <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest block">Live Operational Telemetry</span>
            </div>
          </Link>

          <Link 
             to="/passenger/my-tickets"
             className="group flex flex-col items-center justify-center gap-3 p-8 rounded-[40px] bg-white border-4 border-white shadow-2xl shadow-gray-200/50 hover:border-indigo-400/20 active:scale-95 transition-all text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12 transition-colors group-hover:bg-indigo-100" />
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 relative z-10 group-hover:scale-110 group-hover:rotate-[-6deg] transition-transform">
               <Ticket size={28} strokeWidth={2.5} />
            </div>
            <div className="relative z-10 space-y-1">
               <span className="text-sm font-black text-navy-900 tracking-tighter leading-none block uppercase">My Tickets</span>
               <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest block">Complete Voyage Archive</span>
            </div>
          </Link>
        </div>

        <button 
          onClick={() => navigate('/passenger')}
          className="mt-12 group flex items-center gap-6 py-4 px-8 bg-white rounded-full border-2 border-white shadow-xl hover:shadow-2xl active:scale-95 transition-all"
        >
          <div className="w-8 h-8 rounded-xl bg-[#F6F8FA] flex items-center justify-center text-navy-900 group-hover:rotate-[-12deg] transition-transform">
             <ChevronLeft size={18} strokeWidth={4} />
          </div>
          <span className="text-[10px] font-black text-navy-900 uppercase tracking-[0.3em]">Return to Apex Hub</span>
        </button>

        <p className="mt-12 text-[8px] font-black text-gray-300 uppercase tracking-[0.8em]">Magaalo Velocity · Voyage Secured Protocol</p>
      </div>
    </div>
  );
}