import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Search, Filter, Download, MoreVertical, Weight, Truck, MapPin, User, Phone, Check, X, Box, ChevronRight, TrendingUp, AlertCircle, DollarSign } from 'lucide-react';

const MOCK_CARGO = [
  { id: 'CRG-8812', sender: 'Ahmed W.', receiver: 'Samira O.', route: 'Hargeisa → Berbera', weight: '24kg', status: 'In Transit', type: 'Electronics', amount: 120 },
  { id: 'CRG-8810', sender: 'Nimco Ali', receiver: 'Liban Noor', route: 'Garowe → Bossaso', weight: '12kg', status: 'Delivered', type: 'Textiles', amount: 45 },
  { id: 'CRG-8795', sender: 'Safar Hersi', receiver: 'Abdi Bile', route: 'Berbera → Hargeisa', weight: '5kg', status: 'Pending', type: 'Documents', amount: 15 },
];

export default function AdminCargo() {
  const [cargoList, setCargoList] = useState(MOCK_CARGO);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCargo, setNewCargo] = useState({
    sender: '', senderPhone: '', receiver: '', receiverPhone: '', 
    route: 'Hargeisa → Berbera', weight: '', type: 'General', amount: ''
  });

  const getStatusStyle = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-teal-50 text-teal-600 border-teal-100 shadow-teal-500/5';
      case 'in transit': return 'bg-indigo-50 text-indigo-500 border-indigo-100 shadow-indigo-100/5';
      case 'pending': return 'bg-navy-50 text-navy-400 border-navy-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  const handleAddCargo = (e) => {
    e.preventDefault();
    const id = `CRG-${Math.floor(1000 + Math.random() * 9000)}`;
    setCargoList([{ ...newCargo, id, status: 'Pending' }, ...cargoList]);
    setShowAddModal(false);
    setNewCargo({ sender: '', senderPhone: '', receiver: '', receiverPhone: '', route: 'Hargeisa → Berbera', weight: '', type: 'General', amount: '' });
  };

  return (
    <div className="space-y-12 pb-24 relative">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/20 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:bg-teal-50/40 transition-colors"></div>
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-teal-500 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-teal-100 border-4 border-white transform rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 ring-2 ring-gray-50">
               <Package size={36} strokeWidth={3} />
            </div>
            <div className="flex flex-col gap-1">
               <h1 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">Cargo Logistics</h1>
               <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 bg-teal-50 px-3 py-1 rounded-lg border border-teal-100 shadow-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-teal-500 leading-none">{cargoList.length} Active Shipments</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Express Freight Network</span>
               </div>
            </div>
         </div>

         <div className="flex gap-4 relative z-10 w-full lg:w-fit">
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-teal-500 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-teal-100 active:scale-95 transition-all group/btn"
            >
               <Plus size={20} strokeWidth={4} className="group-hover/btn:rotate-90 transition-transform duration-500" />
               Book New Cargo
            </button>
            <button className="w-16 h-16 bg-white border-4 border-gray-50 rounded-[28px] flex items-center justify-center text-gray-400 hover:text-navy-900 shadow-sm transition-all active:scale-95 active:rotate-12 outline-none">
               <Download size={24} strokeWidth={4} />
            </button>
         </div>
      </div>

      {/* Cargo Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {[
           { label: 'Total Volume', value: '1.2 Tons', icon: Weight, color: 'indigo' },
           { label: 'Network Revenue', value: '$4,812', icon: DollarSign, color: 'teal' },
           { label: 'Active Fleet', value: '18 Units', icon: Truck, color: 'navy' },
           { label: 'Efficiency', value: '98.4%', icon: TrendingUp, color: 'indigo' }
         ].map((stat, idx) => (
           <div key={idx} className="bg-white p-8 rounded-[48px] shadow-xl shadow-gray-100 border border-gray-50 group hover:shadow-2xl transition-all">
              <div className="flex items-center gap-6">
                 <div className={`w-16 h-16 rounded-3xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-500 group-hover:bg-${stat.color}-500 group-hover:text-white transition-all duration-500`}>
                    <stat.icon size={24} strokeWidth={3} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-gray-300 uppercase leading-none mb-1">{stat.label}</span>
                    <span className="text-2xl font-black text-navy-900 tracking-tighter">{stat.value}</span>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {/* Cargo Manifest Table */}
      <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
         <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-2">
            <div className="relative group w-full md:w-[420px]">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-400 transition-colors">
                  <Search size={18} strokeWidth={3} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search by ID or Client..." 
                 className="w-full pl-14 pr-6 py-4 bg-[#F6F8FA] border-2 border-transparent rounded-[24px] text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-teal-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner"
               />
            </div>
            <div className="flex gap-4 w-full md:w-fit overflow-x-auto no-scrollbar pb-1">
               {['All Shipments', 'Pending', 'In Transit', 'Delivered'].map((f) => (
                 <button 
                  key={f} 
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${f === 'All Shipments' ? 'bg-navy-900 text-white shadow-xl' : 'bg-[#F6F8FA] text-gray-300 border-2 border-transparent hover:bg-gray-100'}`}
                 >
                    {f}
                 </button>
               ))}
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b-2 border-gray-50">
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Reference</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Sender / Receiver</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Logistics Data</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Manifest Detail</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Revenue</th>
                     <th className="pb-8 px-6 text-[11px] font-black text-gray-300 uppercase tracking-[0.4em]">Status</th>
                     <th className="pb-8 px-6"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {cargoList.map((cargo) => (
                    <tr key={cargo.id} className="group hover:bg-[#F6F8FA] transition-all">
                       <td className="py-10 px-6">
                          <span className="text-sm font-black text-navy-400 font-mono tracking-tighter bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 group-hover:bg-white group-hover:border-navy-900 group-hover:text-navy-900 transition-all">{cargo.id}</span>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex flex-col gap-1 translation-x-0 group-hover:translate-x-2 transition-transform">
                             <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-teal-500 uppercase tracking-widest w-8">From</span>
                                <span className="text-sm font-black text-navy-900">{cargo.sender}</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest w-8">To</span>
                                <span className="text-sm font-black text-navy-900">{cargo.receiver}</span>
                             </div>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex flex-col gap-1.5">
                             <span className="text-sm font-black text-gray-800 leading-none">{cargo.route}</span>
                             <div className="flex items-center gap-2 text-gray-300">
                                <MapPin size={10} strokeWidth={3} className="text-teal-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Via Main Arterial</span>
                             </div>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="flex flex-col gap-2">
                             <div className="flex items-center gap-3">
                                <Weight size={12} className="text-gray-300" />
                                <span className="text-xs font-black text-gray-500 tracking-tighter">{cargo.weight} Net</span>
                             </div>
                             <div className="flex items-center gap-3">
                                <Box size={12} className="text-gray-300" />
                                <span className="text-xs font-black text-teal-600 tracking-tighter uppercase tracking-widest text-[9px]">{cargo.type}</span>
                             </div>
                          </div>
                       </td>
                       <td className="py-10 px-6">
                          <div className="text-xl font-black text-navy-900 tracking-tighter">${cargo.amount}</div>
                       </td>
                       <td className="py-10 px-6">
                          <div className={`px-5 py-2 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center gap-2 transition-all w-fit ${getStatusStyle(cargo.status)}`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${cargo.status === 'In Transit' ? 'bg-indigo-500 animate-pulse' : cargo.status === 'Delivered' ? 'bg-teal-500' : 'bg-navy-400'}`}></div>
                             <span className="text-[9px] font-black uppercase tracking-widest leading-none">{cargo.status}</span>
                          </div>
                       </td>
                       <td className="py-10 px-6 text-center">
                          <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-100 hover:text-navy-900 shadow-sm border border-gray-50 hover:shadow-xl active:scale-95 transition-all outline-none">
                             <MoreVertical size={18} strokeWidth={2.5} />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Book Cargo Modal */}
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
              className="bg-white rounded-[60px] shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden border-8 border-white"
            >
              <div className="bg-teal-500 p-12 text-white relative">
                 <button 
                   onClick={() => setShowAddModal(false)}
                   className="absolute top-8 right-8 w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all active:scale-90"
                 >
                   <X size={24} strokeWidth={3} />
                 </button>
                 <h2 className="text-3xl font-black tracking-tighter mb-2">Freight Booking Protocol</h2>
                 <p className="text-white/60 text-[10px] uppercase font-black tracking-[0.4em]">Register Active Logistics Shipment</p>
              </div>

              <form onSubmit={handleAddCargo} className="p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                 {/* Left Side: Client Data */}
                 <div className="space-y-8">
                    <h3 className="text-xl font-black text-navy-900 tracking-tighter flex items-center gap-4">
                       <User size={20} className="text-teal-500" />
                       Client Identity
                    </h3>
                    
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Consignor (Sender)</label>
                          <input required type="text" placeholder="Full legal name" value={newCargo.sender} onChange={e => setNewCargo({...newCargo, sender: e.target.value})} className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-teal-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Consignee (Receiver)</label>
                          <input required type="text" placeholder="Full legal name" value={newCargo.receiver} onChange={e => setNewCargo({...newCargo, receiver: e.target.value})} className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-teal-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner" />
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Sender Nexus</label>
                             <input required type="tel" placeholder="+252 63..." value={newCargo.senderPhone} onChange={e => setNewCargo({...newCargo, senderPhone: e.target.value})} className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-teal-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Receiver Nexus</label>
                             <input required type="tel" placeholder="+252 63..." value={newCargo.receiverPhone} onChange={e => setNewCargo({...newCargo, receiverPhone: e.target.value})} className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-teal-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner" />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Right Side: Logistical Data */}
                 <div className="space-y-8">
                    <h3 className="text-xl font-black text-navy-900 tracking-tighter flex items-center gap-4">
                       <Box size={20} className="text-indigo-500" />
                       Shipment Config
                    </h3>

                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Assigned Route Path</label>
                          <input required type="text" placeholder="Ex: Hargeisa → Berbera" value={newCargo.route} onChange={e => setNewCargo({...newCargo, route: e.target.value})} className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner" />
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Net Weight (kg)</label>
                             <input required type="number" placeholder="25" value={newCargo.weight} onChange={e => setNewCargo({...newCargo, weight: e.target.value})} className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Freight Tier ($)</label>
                             <input required type="number" placeholder="100" value={newCargo.amount} onChange={e => setNewCargo({...newCargo, amount: e.target.value})} className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-indigo-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-indigo-50 shadow-inner" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-1">Classification Type</label>
                          <select value={newCargo.type} onChange={e => setNewCargo({...newCargo, type: e.target.value})} className="w-full p-5 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold focus:outline-none focus:bg-white focus:border-teal-400/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner appearance-none cursor-pointer">
                             <option>General</option>
                             <option>Electronics</option>
                             <option>Textiles</option>
                             <option>Documents</option>
                             <option>Fragile</option>
                          </select>
                       </div>
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="md:col-span-2 w-full py-6 bg-teal-500 text-white rounded-[32px] font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-teal-100 active:scale-95 transition-all outline-none"
                 >
                    Finalize Freight Registration
                 </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
