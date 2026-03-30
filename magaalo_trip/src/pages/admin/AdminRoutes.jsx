import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Plus, Search, MoreVertical, MapPin, Navigation2, ChevronRight, X, Info, Download, Filter, Trash2, Edit3, ArrowRightLeft, Check } from 'lucide-react';

const MOCK_ROUTES = [
  { id: 1, name: 'Coastal Express', from: 'Hargeisa', to: 'Berbera', distance: '160km', duration: '3h 30m', price: 15, status: 'Active' },
  { id: 2, name: 'Northern Hub', from: 'Garowe', to: 'Bossaso', distance: '180km', duration: '4h 15m', price: 20, status: 'Active' },
  { id: 3, name: 'Western Trail', from: 'Hargeisa', to: 'Borama', distance: '120km', duration: '2h 45m', price: 10, status: 'Inactive' },
  { id: 4, name: 'Central Path', from: 'Mogadishu', to: 'Baidoa', distance: '240km', duration: '5h 00m', price: 25, status: 'Active' },
];

export default function AdminRoutes() {
  const [routes, setRoutes] = useState(MOCK_ROUTES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  
  const [newRoute, setNewRoute] = useState({
    name: '', from: '', to: '', distance: '', duration: '', price: ''
  });

  const toggleStatus = (id) => {
    setRoutes(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r));
  };

  const handleAddRoute = (e) => {
    e.preventDefault();
    const id = routes.length + 1;
    setRoutes([...routes, { ...newRoute, id, status: 'Active' }]);
    setShowAddModal(false);
    setNewRoute({ name: '', from: '', to: '', distance: '', duration: '', price: '' });
  };

  const filteredRoutes = routes.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.from.toLowerCase().includes(search.toLowerCase()) ||
    r.to.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 relative">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-navy-50/20 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:bg-navy-50/40 transition-colors"></div>
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-navy-900 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-navy-200 border-4 border-navy-800 transform rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 ring-2 ring-gray-50">
               <Map size={36} strokeWidth={3} />
            </div>
            <div className="flex flex-col gap-1">
               <h1 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">Routes Management</h1>
               <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 bg-teal-50 px-3 py-1 rounded-lg border border-teal-100 shadow-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#17A2A9] animate-pulse"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#17A2A9] leading-none">{routes.filter(r => r.status === 'Active').length} Active Links</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Global Transit Network</span>
               </div>
            </div>
         </div>

         <div className="flex gap-4 relative z-10 w-full lg:w-fit">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-[#0B3D91] text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-navy-100 active:scale-95 transition-all group/btn"
            >
               <Plus size={20} strokeWidth={4} className="group-hover/btn:rotate-90 transition-transform duration-500" />
               Establish New Route
            </button>
            <button className="w-16 h-16 bg-white border-4 border-gray-50 rounded-[28px] flex items-center justify-center text-gray-400 hover:text-navy-900 shadow-sm transition-all active:scale-95 active:rotate-12 outline-none">
               <Download size={24} strokeWidth={4} />
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
         {/* Filter Bar */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-2">
            <div className="relative group w-full md:w-[480px]">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2A9] transition-colors">
                  <Search size={20} strokeWidth={3} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search by city, name or ID..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-16 pr-6 py-5 bg-[#F6F8FA] border-2 border-transparent rounded-[28px] text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner shadow-gray-100"
               />
            </div>
            <div className="flex gap-4 w-full md:w-fit overflow-x-auto no-scrollbar pb-1">
               {['All', 'Domestic', 'Regional', 'Express'].map((f) => (
                 <button key={f} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${f === 'All' ? 'bg-navy-900 text-white shadow-xl translate-y-[-1px]' : 'bg-white text-gray-300 border-2 border-gray-50 hover:bg-gray-50'}`}>
                    {f}
                 </button>
               ))}
            </div>
         </div>

         {/* Routes Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b-2 border-gray-50">
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Ident / Name</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Connection</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Telemetry</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Pricing</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Operational Status</th>
                     <th className="pb-8 px-6"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {filteredRoutes.map((route) => (
                    <tr key={route.id} className="group hover:bg-[#F6F8FA] transition-all duration-300 active:scale-[0.995]">
                       <td className="py-10 px-6">
                          <div className="flex flex-col gap-1.5 translate-x-0 group-hover:translate-x-2 transition-transform">
                             <span className="text-xl font-black text-navy-900 leading-none tracking-tighter">{route.name}</span>
                             <span className="text-[10px] font-black text-[#17A2A9] uppercase tracking-widest block mt-1">Ref ID · RT-00{route.id}VB</span>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex items-center gap-6">
                             <div className="flex flex-col items-center">
                                <span className="text-base font-black text-gray-800 leading-none">{route.from}</span>
                             </div>
                             <div className="w-12 h-10 border-b-4 border-dashed border-gray-100 relative group-hover:border-teal-100 transition-colors">
                                <ArrowRightLeft size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 text-gray-100 group-hover:text-teal-400 group-hover:rotate-180 transition-all duration-700" />
                             </div>
                             <div className="flex flex-col items-center">
                                <span className="text-base font-black text-gray-800 leading-none">{route.to}</span>
                             </div>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-3">
                                <Navigation2 size={12} className="text-gray-300 rotate-90" />
                                <span className="text-sm font-black text-gray-500 tracking-tighter">{route.distance}</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <Plus size={12} className="text-gray-300 rotate-45" />
                                <span className="text-sm font-black text-gray-500 tracking-tighter">{route.duration} Transit</span>
                             </div>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex flex-col items-start bg-white p-3 px-5 rounded-[24px] shadow-inner-lg border-2 border-gray-50/50 w-fit group-hover:shadow-xl transition-all">
                             <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Pass. Fare</span>
                             <span className="text-2xl font-black text-navy-900 tracking-tighter leading-none">${route.price}</span>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <button 
                            onClick={() => toggleStatus(route.id)}
                            className={`flex items-center justify-between gap-4 p-2 pl-6 pr-3 border-4 rounded-[28px] group/toggle transition-all duration-500 ${route.status === 'Active' ? 'bg-teal-50 border-white shadow-xl shadow-teal-900/5 text-teal-600' : 'bg-gray-50 border-white shadow-inner text-gray-300 grayscale'}`}
                          >
                             <span className="text-[10px] font-black uppercase tracking-widest">{route.status}</span>
                             <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-white shadow-2xl transition-all duration-500 ${route.status === 'Active' ? 'bg-[#17A2A9] text-white' : 'bg-white text-gray-200'}`}>
                                {route.status === 'Active' ? <Check size={18} strokeWidth={4} /> : <X size={18} strokeWidth={4} />}
                             </div>
                          </button>
                       </td>
                       <td className="py-10 px-6 text-center">
                          <div className="flex items-center gap-3">
                             <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-100 hover:text-navy-900 shadow-sm border border-gray-50 hover:shadow-xl hover:rotate-6 transition-all active:scale-95"><Edit3 size={18} strokeWidth={2.5} /></button>
                             <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-100 hover:text-red-500 shadow-sm border border-gray-50 hover:shadow-xl active:scale-95 transition-all"><Trash2 size={18} strokeWidth={2.5} /></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Add Route Modal */}
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
              <div className="brand-gradient p-12 text-white relative">
                 <button 
                   onClick={() => setShowAddModal(false)}
                   className="absolute top-8 right-8 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all active:scale-90"
                 >
                   <X size={24} strokeWidth={3} />
                 </button>
                 <h2 className="text-3xl font-black tracking-tighter mb-2">Establish Connection</h2>
                 <p className="text-white/60 text-[10px] uppercase font-black tracking-[0.4em]">New Fleet Route Node</p>
              </div>

              <form onSubmit={handleAddRoute} className="p-12 space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Route Descriptor</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Coastal Express..." 
                         value={newRoute.name}
                         onChange={(e) => setNewRoute({...newRoute, name: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Baseline Fare ($)</label>
                       <input 
                         required
                         type="number" 
                         placeholder="15" 
                         value={newRoute.price}
                         onChange={(e) => setNewRoute({...newRoute, price: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Departure City</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Hargeisa" 
                         value={newRoute.from}
                         onChange={(e) => setNewRoute({...newRoute, from: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Arrival Terminal</label>
                       <input 
                         required
                         type="text" 
                         placeholder="Berbera" 
                         value={newRoute.to}
                         onChange={(e) => setNewRoute({...newRoute, to: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Estimated Distance</label>
                       <input 
                         required
                         type="text" 
                         placeholder="160km" 
                         value={newRoute.distance}
                         onChange={(e) => setNewRoute({...newRoute, distance: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Transit Duration</label>
                       <input 
                         required
                         type="text" 
                         placeholder="3h 30m" 
                         value={newRoute.duration}
                         onChange={(e) => setNewRoute({...newRoute, duration: e.target.value})}
                         className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
                       />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full py-6 mt-4 brand-gradient text-white rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-navy-200 active:scale-95 transition-all outline-none"
                 >
                    Confirm Route Establishment
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}