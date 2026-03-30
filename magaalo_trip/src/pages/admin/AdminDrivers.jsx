import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Search, MoreVertical, Truck, Star, Phone, Mail, Award, Edit3, Trash2, Shield, Radio, ChevronRight, MessageSquare, Download, X, Check, Activity, MapPin } from 'lucide-react';

const MOCK_DRIVERS = [
  { id: 1, name: 'Dahir Hassan', license: 'SOM/DR-99214', rating: 4.98, trips: 142, status: 'On Trip', email: 'dahir@magaalo.com', phone: '+252 63 444111', bus: 'MT-V0914' },
  { id: 2, name: 'Nimco Ali', license: 'SOM/DR-88512', rating: 4.85, trips: 112, status: 'Active', email: 'nimco@magaalo.com', phone: '+252 63 555222', bus: 'MT-S1121' },
  { id: 3, name: 'Abdi Bile', license: 'SOM/DR-77410', rating: 4.70, trips: 89, status: 'Inactive', email: 'abdi@magaalo.com', phone: '+252 63 666333', bus: 'MT-E2045' },
  { id: 4, name: 'Fozia Faris', license: 'SOM/DR-66308', rating: 4.92, trips: 210, status: 'Active', email: 'fozia@magaalo.com', phone: '+252 63 777444', bus: 'MT-B3056' },
];

export default function AdminDrivers() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState(MOCK_DRIVERS);
  const [activeFilter, setActiveFilter] = useState('All Records');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: '', license: '', phone: '', email: '', bus: ''
  });

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'on trip': return 'bg-teal-50 text-teal-600 border-teal-100 shadow-teal-500/5';
      case 'active': return 'bg-navy-50 text-[#0B3D91] border-navy-100 shadow-navy-100/5';
      case 'inactive': return 'bg-red-50 text-red-400 border-red-100 opacity-60';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  const handleAddDriver = (e) => {
    e.preventDefault();
    const id = drivers.length + 1;
    setDrivers([{ ...newDriver, id, rating: 5.0, trips: 0, status: 'Active' }, ...drivers]);
    setShowAddModal(false);
    setNewDriver({ name: '', license: '', phone: '', email: '', bus: '' });
  };

  const filteredDrivers = drivers.filter(d => {
    if (activeFilter === 'Active Only') return d.status === 'Active';
    if (activeFilter === 'On Trip') return d.status === 'On Trip';
    if (activeFilter === 'Suspended') return d.status === 'Inactive';
    return true;
  });

  return (
    <div className="space-y-12 relative">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/20 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:bg-indigo-50/40 transition-colors"></div>
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-indigo-500 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-indigo-100 border-4 border-white transform rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 ring-2 ring-gray-50">
               <Users size={36} strokeWidth={3} />
            </div>
            <div className="flex flex-col gap-1">
               <h1 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">Partners & Pilots</h1>
               <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 shadow-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 leading-none">{drivers.length} Verified Operators</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Fleet Personnel Database</span>
               </div>
            </div>
         </div>

         <div className="flex gap-4 relative z-10 w-full lg:w-fit">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-indigo-500 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-indigo-100 active:scale-95 transition-all group/btn"
            >
               <Plus size={20} strokeWidth={4} className="group-hover/btn:rotate-90 transition-transform duration-500" />
               Register New Partner
            </button>
            <button className="w-16 h-16 bg-white border-4 border-gray-50 rounded-[28px] flex items-center justify-center text-gray-400 hover:text-navy-900 shadow-sm transition-all active:scale-95 active:rotate-12 outline-none">
               <Download size={24} strokeWidth={4} />
            </button>
         </div>
      </div>

      {/* Driver Database Section */}
      <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-2">
            <div className="flex gap-4 w-full md:w-fit overflow-x-auto no-scrollbar pb-1">
               {['All Records', 'Active Only', 'On Trip', 'Suspended'].map((f) => (
                 <button 
                  key={f} 
                  onClick={() => setActiveFilter(f)}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-navy-900 text-white shadow-xl translate-y-[-1px]' : 'bg-[#F6F8FA] text-gray-300 border-2 border-transparent hover:bg-gray-100'}`}
                 >
                    {f}
                 </button>
               ))}
            </div>
            
            <div className="relative group w-full md:w-[320px]">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-400 transition-colors">
                  <Search size={18} strokeWidth={3} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search by license or name..." 
                 className="w-full pl-14 pr-6 py-4 bg-[#F6F8FA] border-2 border-transparent rounded-[24px] text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
               />
            </div>
         </div>

         {/* Driver Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
               {filteredDrivers.map((driver, idx) => (
                 <motion.div 
                    key={driver.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="bg-[#F6F8FA] rounded-[56px] p-2 hover:bg-white border-4 border-transparent hover:border-[#F6F8FA] transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 group active:scale-[0.98]"
                 >
                    <div className="bg-white rounded-[48px] p-8 flex flex-col items-center text-center gap-6 relative overflow-hidden group-hover:shadow-inner group-hover:shadow-gray-100 transition-all">
                       <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full -mr-12 -mt-12 opacity-40 group-hover:opacity-100 transition-opacity"></div>
                       
                       <div className="relative z-10">
                          <div className="w-24 h-24 rounded-[36px] bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-navy-100 border-4 border-white group-hover:rotate-6 transition-transform duration-500">
                             {driver.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl border-4 border-white flex items-center justify-center shadow-xl transition-all ${getStatusStyle(driver.status)}`}>
                             <Radio size={16} strokeWidth={4} className={driver.status === 'On Trip' ? 'animate-pulse' : ''} />
                          </div>
                       </div>

                       <div className="flex flex-col gap-1 relative z-10 w-full">
                          <h4 className="text-xl font-black text-navy-900 leading-none group-hover:text-indigo-500 transition-colors uppercase tracking-widest text-[12px] truncate px-2">{driver.name}</h4>
                          <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-1">LID · {driver.license}</span>
                          
                          <div className="flex items-center justify-center gap-4 mt-4 py-2 bg-gray-50/50 rounded-2xl border-2 border-white shadow-inner">
                             <div className="flex items-center gap-1.5">
                                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-[10px] font-black text-navy-900">{driver.rating}</span>
                             </div>
                             <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                             <div className="flex items-center gap-1.5">
                                <Truck size={12} className="text-indigo-500" />
                                <span className="text-[10px] font-black text-navy-900">{driver.trips} Trips</span>
                             </div>
                          </div>
                       </div>

                       <div className="w-full flex flex-col gap-3 relative z-10 pt-4 border-t border-gray-50 border-dashed">
                          <button 
                            onClick={() => navigate(`/admin/drivers/${driver.id}`)}
                            className="w-full px-6 py-3 bg-[#F6F8FA] hover:bg-white hover:shadow-xl hover:border-white transition-all rounded-2xl text-[10px] font-black uppercase tracking-widest text-navy-400 hover:text-navy-900 flex items-center justify-between border-2 border-transparent outline-none"
                          >
                             Dashboard Profile
                             <ChevronRight size={14} />
                          </button>
                          <div className="flex gap-2">
                             <button className="flex-1 px-4 py-3 bg-[#F6F8FA] hover:bg-navy-50 rounded-2xl text-navy-400 hover:text-[#0B3D91] transition-all flex items-center justify-center border-2 border-transparent outline-none"><MessageSquare size={16} strokeWidth={2.5} /></button>
                             <button className="flex-1 px-4 py-3 bg-[#F6F8FA] hover:bg-teal-50 rounded-2xl text-navy-400 hover:text-[#17A2A9] transition-all flex items-center justify-center border-2 border-transparent outline-none"><Phone size={16} strokeWidth={2.5} /></button>
                             <button className="flex-1 px-4 py-3 bg-[#F6F8FA] hover:bg-red-50 rounded-2xl text-navy-400 hover:text-red-500 transition-all flex items-center justify-center border-2 border-transparent outline-none"><Trash2 size={16} strokeWidth={2.5} /></button>
                          </div>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </AnimatePresence>
         </div>
      </div>

      {/* Add Partner Modal */}
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
                 <h2 className="text-3xl font-black tracking-tighter mb-2">Partner Onboarding</h2>
                 <p className="text-white/60 text-[10px] uppercase font-black tracking-[0.4em]">Register Verified Operational Agent</p>
              </div>

              <form onSubmit={handleAddDriver} className="p-12 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Legal Full Name</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: Dahir Hassan" 
                         value={newDriver.name}
                         onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Operational License ID</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: SOM/DR-00123" 
                         value={newDriver.license}
                         onChange={(e) => setNewDriver({...newDriver, license: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Contact Nexus (Phone)</label>
                       <input 
                         required
                         type="tel" 
                         placeholder="+252 63..." 
                         value={newDriver.phone}
                         onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Assigned Vehicle Ref</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Ex: MT-V0914" 
                         value={newDriver.bus}
                         onChange={(e) => setNewDriver({...newDriver, bus: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-6 mt-4 bg-indigo-500 text-white rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-indigo-100 active:scale-95 transition-all outline-none"
                 >
                    Finalize Partner Registration
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}