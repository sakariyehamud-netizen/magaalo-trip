import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, QrCode, User, Check, X, Phone, MoreVertical, Navigation2, Bus, MapPin, Search, Package, Weight, Box, Info } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const MOCK_PASSENGERS = [
  { id: 1, name: 'Safar Hersi', phone: '+252 63 444000', seat: '2A', status: 'checked-in', method: 'M-Pesa' },
  { id: 2, name: 'Nimco Ali', phone: '+252 63 555111', seat: '2B', status: 'pending', method: 'Card' },
  { id: 3, name: 'Abdi Bile', phone: '+252 63 999222', seat: '4C', status: 'pending', method: 'Cash' },
  { id: 4, name: 'Fozia Faris', phone: '+252 63 777333', seat: '1A', status: 'no-show', method: 'M-Pesa' },
];

const MOCK_CARGO = [
  { id: 'CRG-8812', sender: 'Ahmed W.', receiver: 'Samira O.', weight: '24kg', type: 'Electronics', status: 'on-board' },
  { id: 'CRG-8814', sender: 'Nimco Ali', receiver: 'Liban Noor', weight: '12kg', type: 'Textiles', status: 'pending' },
];

export default function DriverTripDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tripStatus, setTripStatus] = useState('boarding'); // scheduled, boarding, in_transit, completed
  const [activeTab, setActiveTab] = useState('passengers'); // passengers, cargo
  const [passengers, setPassengers] = useState(MOCK_PASSENGERS);
  const [cargo, setCargo] = useState(MOCK_CARGO);

  const toggleCheckIn = (pId) => {
    setPassengers(prev => prev.map(p => {
      if (p.id === pId) return { ...p, status: p.status === 'checked-in' ? 'pending' : 'checked-in' };
      return p;
    }));
  };

  const toggleCargoStatus = (cId) => {
    setCargo(prev => prev.map(c => {
      if (c.id === cId) return { ...c, status: c.status === 'on-board' ? 'pending' : 'on-board' };
      return c;
    }));
  };

  const getStatusAction = () => {
    switch(tripStatus) {
      case 'scheduled': return { label: 'Start Boarding', color: 'bg-[#17A2A9]', icon: Bus, next: 'boarding' };
      case 'boarding': return { label: 'Depart Terminal', color: 'bg-[#0B3D91]', icon: Navigation2, next: 'in_transit' };
      case 'in_transit': return { label: 'Complete Trip', color: 'bg-green-600', icon: Check, next: 'completed' };
      default: return null;
    }
  };

  const action = getStatusAction();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white px-8 pt-16 pb-12 rounded-b-[60px] border-b border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-navy-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="flex justify-between items-start mb-10 relative z-10">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)} 
                className="w-14 h-14 bg-gray-50 rounded-[28px] flex items-center justify-center border-4 border-white shadow-xl active:scale-95 transition-all text-gray-400 hover:text-navy-900"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <div className="flex flex-col">
                 <h1 className="text-3xl font-black text-navy-900 leading-none">Trip Dashboard</h1>
                 <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">Route ID · MT-V{id}0914</span>
                 </div>
              </div>
           </div>
           <button className="w-14 h-14 bg-teal-50 rounded-[28px] flex items-center justify-center border-4 border-white shadow-xl text-teal-600 active:scale-95 transition-all">
             <QrCode size={24} strokeWidth={2.5} />
           </button>
        </div>

        <div className="flex flex-col gap-6 p-2 relative z-10">
           <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                 <span className="text-[10px] font-black text-navy-900/40 uppercase tracking-[0.4em] leading-none mb-1">Active Journey</span>
                 <h2 className="text-2xl font-black text-navy-900">Hargeisa → Berbera</h2>
              </div>
              <div className="bg-[#17A2A9] px-4 py-2 rounded-2xl flex items-center gap-2 border-4 border-teal-50 text-white shadow-xl shadow-teal-500/10">
                 <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest">{tripStatus}</span>
              </div>
           </div>

           {/* Tab Switcher */}
           <div className="flex bg-[#F6F8FA] p-1.5 rounded-[24px] border-2 border-white shadow-inner mt-4">
              <button 
                onClick={() => setActiveTab('passengers')}
                className={`flex-1 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'passengers' ? 'bg-white text-navy-900 shadow-xl' : 'text-gray-300 hover:text-navy-400'}`}
              >
                 Passengers ({passengers.length})
              </button>
              <button 
                onClick={() => setActiveTab('cargo')}
                className={`flex-1 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'cargo' ? 'bg-white text-teal-600 shadow-xl' : 'text-gray-300 hover:text-teal-400'}`}
              >
                 Cargo ({cargo.length})
              </button>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-8 py-10 space-y-6">
        <AnimatePresence mode="wait">
           {activeTab === 'passengers' ? (
             <motion.div 
               key="passengers"
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 20 }}
               className="space-y-4"
             >
                {passengers.map((p) => (
                  <div 
                    key={p.id}
                    className={`bg-white p-6 rounded-[32px] border shadow-sm flex items-center justify-between transition-all ${p.status === 'checked-in' ? 'border-teal-100 bg-teal-50/20' : p.status === 'no-show' ? 'border-red-50 bg-red-50/20 opacity-60' : 'border-gray-50'}`}
                  >
                    <div className="flex items-center gap-5">
                       <div className="relative">
                          <div className={`w-14 h-14 rounded-[22px] border-4 border-white shadow-xl flex items-center justify-center text-lg font-black ${p.status === 'checked-in' ? 'bg-[#17A2A9] text-white' : 'bg-[#F6F8FA] text-gray-300'}`}>
                             {p.seat}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-lg border-2 border-white flex items-center justify-center shadow-lg ${p.status === 'checked-in' ? 'bg-green-500 text-white' : 'bg-white text-gray-200'}`}>
                            <Check size={12} strokeWidth={4} />
                          </div>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-base font-black text-navy-900 leading-none mb-1">{p.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{p.method}</span>
                            <div className="w-1 h-1 bg-gray-100 rounded-full"></div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{p.phone}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-2">
                       {p.status !== 'checked-in' && (
                         <button className="w-12 h-12 bg-gray-50 rounded-[20px] flex items-center justify-center text-red-300 border border-red-50 hover:bg-red-50 hover:text-red-500 transition-colors">
                           <X size={20} strokeWidth={3} />
                         </button>
                       )}
                       <button 
                         onClick={() => toggleCheckIn(p.id)}
                         className={`w-12 h-12 rounded-[20px] flex items-center justify-center border transition-all ${p.status === 'checked-in' ? 'bg-[#0B3D91] text-white border-navy-900 shadow-xl shadow-navy-200' : 'bg-white text-teal-600 border-[#17A2A9] shadow-sm hover:bg-[#17A2A9] hover:text-white'}`}
                       >
                         {p.status === 'checked-in' ? <X size={20} strokeWidth={3} /> : <Check size={20} strokeWidth={3} />}
                       </button>
                    </div>
                  </div>
                ))}
             </motion.div>
           ) : (
             <motion.div 
               key="cargo"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="space-y-4"
             >
                {cargo.map((c) => (
                  <div 
                    key={c.id}
                    className={`bg-white p-6 rounded-[32px] border shadow-sm flex items-center justify-between transition-all ${c.status === 'on-board' ? 'border-teal-100 bg-teal-50/20' : 'border-gray-50'}`}
                  >
                    <div className="flex items-center gap-5">
                       <div className="relative">
                          <div className={`w-14 h-14 rounded-[22px] border-4 border-white shadow-xl flex items-center justify-center text-lg font-black ${c.status === 'on-board' ? 'bg-[#17A2A9] text-white' : 'bg-[#F6F8FA] text-gray-300'}`}>
                             <Package size={24} strokeWidth={2.5} />
                          </div>
                          {c.status === 'on-board' && (
                             <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg border-2 border-white flex items-center justify-center shadow-lg bg-green-500 text-white">
                                <Check size={12} strokeWidth={4} />
                             </div>
                          )}
                       </div>
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                             <span className="text-base font-black text-navy-900 leading-none">{c.id}</span>
                             <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                             <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest">{c.type}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1">
                               <User size={10} className="text-[#17A2A9]" /> {c.receiver}
                            </span>
                            <div className="w-1 h-1 bg-gray-100 rounded-full"></div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest flex items-center gap-1">
                               <Weight size={10} className="text-indigo-400" /> {c.weight}
                            </span>
                          </div>
                       </div>
                    </div>

                    <button 
                      onClick={() => toggleCargoStatus(c.id)}
                      className={`w-12 h-12 rounded-[20px] flex items-center justify-center border transition-all ${c.status === 'on-board' ? 'bg-navy-900 text-white border-navy-900 shadow-xl' : 'bg-white text-teal-600 border-teal-500 shadow-sm hover:bg-teal-500 hover:text-white'}`}
                    >
                      {c.status === 'on-board' ? <Package size={20} strokeWidth={3} /> : <Check size={20} strokeWidth={3} />}
                    </button>
                  </div>
                ))}
                
                {cargo.length === 0 && (
                   <div className="py-20 flex flex-col items-center gap-6 opacity-20">
                      <Box size={64} strokeWidth={1} />
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">No Freight Assigned To This Voyage</p>
                   </div>
                )}
             </motion.div>
           )}
        </AnimatePresence>
      </div>

      {/* Persistent Status Control Bar */}
      {action && (
        <div className="fixed bottom-0 left-0 right-0 p-8 pt-4 pb-12 z-50">
           <div className="bg-white/40 backdrop-blur-2xl px-6 py-6 border-t border-white rounded-[48px] shadow-2xl flex items-center justify-between border-2">
             <div className="flex flex-col gap-1 ml-4">
                <span className="text-[10px] font-black text-navy-900 uppercase tracking-widest leading-none mb-1">Current Status</span>
                <span className="text-xl font-black text-navy-900 leading-none flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#17A2A9]"></div>
                   <span className="capitalize">{tripStatus.replace('_', ' ')}</span>
                </span>
             </div>
             
             <button 
               onClick={() => setTripStatus(action.next)}
               className={`group flex items-center gap-6 p-2 rounded-[32px] overflow-hidden ${action.color} shadow-2xl shadow-navy-900/20 active:scale-95 transition-all text-white pr-8`}
             >
                <div className="w-14 h-14 rounded-3xl bg-white/20 flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                   <action.icon size={28} strokeWidth={3} />
                </div>
                <div className="flex flex-col items-start leading-none gap-1">
                   <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Confirm Ready</span>
                   <span className="text-sm font-black uppercase tracking-widest">{action.label}</span>
                </div>
             </button>
           </div>
        </div>
      )}
    </div>
  );
}