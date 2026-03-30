import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Info, Wallet, CreditCard, Banknote, ShieldCheck, Phone, User, Mail, DollarSign, ArrowRight } from 'lucide-react';
import { useNavigate, useParams, useSearchParams, Link } from 'react-router-dom';

const PAYMENT_METHODS = [
  { id: 'zaad', name: 'Zaad Service', icon: Phone, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'edahab', name: 'eDahab Pay', icon: CreditCard, color: 'text-teal-600', bg: 'bg-teal-50' },
  { id: 'wallet', name: 'M-Wallet', icon: Wallet, color: 'text-navy-900', bg: 'bg-navy-50' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const seats = searchParams.get('seats')?.split(',') || [];
  
  const [paymentMethod, setPaymentMethod] = useState('zaad');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const basePrice = 15;
  const subtotal = basePrice * seats.length;
  const serviceFee = 1.25;
  const total = subtotal + serviceFee;

  const isFormValid = formData.name && formData.phone;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-32">
      {/* Premium Header */}
      <div className="bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] px-8 pt-16 pb-12 rounded-b-[60px] text-white overflow-hidden relative shadow-2xl shadow-indigo-100">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl -mb-24 -ml-12 pointer-events-none" />

        <div className="flex justify-between items-center mb-8 relative z-10">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)} 
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-[28px] flex items-center justify-center border-2 border-white/20 shadow-xl active:scale-95 transition-all text-white hover:bg-white/20"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <div className="flex flex-col">
                 <h1 className="text-3xl font-black text-white tracking-tighter leading-none">Checkout</h1>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mt-2">Manifest Finalization · MT-{id}</p>
              </div>
           </div>
           
           <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-[24px] flex items-center justify-center border border-white/20 shadow-xl text-white">
              <ShieldCheck size={24} strokeWidth={2.5} />
           </div>
        </div>

        {/* Tactical Summary Segment */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-[32px] border border-white/10 relative z-10 flex flex-col gap-4">
           <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                 <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em] leading-none mb-1">Assigned Corridor</span>
                 <h3 className="text-xl font-black text-white tracking-tighter flex items-center gap-3">
                    Hargeisa <ArrowRight size={14} className="text-teal-400" /> Berbera
                 </h3>
              </div>
              <div className="bg-teal-400 px-4 py-1.5 rounded-xl text-[10px] font-black text-navy-900 uppercase tracking-widest shadow-xl shadow-teal-500/10">
                 {seats.length} UNIT{seats.length > 1 ? 'S' : ''}
              </div>
           </div>
           
           <div className="h-px bg-white/10 w-full" />
           
           <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-1">
                 <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Operational Date</span>
                 <span className="text-sm font-black text-white tracking-tighter">Oct 24 · 08:30 AM</span>
              </div>
              <div className="flex flex-col gap-1">
                 <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.3em]">Seat Manifest</span>
                 <span className="text-sm font-black text-white tracking-tighter uppercase">{seats.join(' · ') || 'PENDING'}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="px-8 -mt-6 space-y-10 relative z-20">
        {/* Identity Nexus Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
             <div className="w-8 h-1 bg-navy-900 rounded-full" />
             <h2 className="text-lg font-black text-navy-900 tracking-tighter">Identity Nexus</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Subject Name</label>
              <div className="relative group">
                 <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-navy-900 transition-colors">
                    <User size={18} strokeWidth={3} />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Ex: Ahmed Weli" 
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   className="w-full pl-16 pr-6 py-5 bg-white rounded-[28px] border-4 border-white shadow-xl shadow-gray-100 focus:outline-none focus:border-indigo-100 transition-all font-black text-navy-900 text-sm placeholder:text-gray-200 outline-none" 
                 />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Secure Contact (Mobile)</label>
                <div className="relative group">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-navy-900 transition-colors">
                      <Phone size={18} strokeWidth={3} />
                   </div>
                   <input 
                     type="tel" 
                     placeholder="+252 63..." 
                     value={formData.phone}
                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     className="w-full pl-16 pr-6 py-5 bg-white rounded-[28px] border-4 border-white shadow-xl shadow-gray-100 focus:outline-none focus:border-indigo-100 transition-all font-black text-navy-900 text-sm placeholder:text-gray-200 outline-none" 
                   />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Digital Mail (Receipts)</label>
                <div className="relative group">
                   <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-navy-900 transition-colors">
                      <Mail size={18} strokeWidth={3} />
                   </div>
                   <input 
                     type="email" 
                     placeholder="ahmed@agency.com" 
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full pl-16 pr-6 py-5 bg-white rounded-[28px] border-4 border-white shadow-xl shadow-gray-100 focus:outline-none focus:border-indigo-100 transition-all font-black text-navy-900 text-sm placeholder:text-gray-200 outline-none" 
                   />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateway Protocol */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
             <div className="w-8 h-1 bg-teal-500 rounded-full" />
             <h2 className="text-lg font-black text-navy-900 tracking-tighter">Gateway Protocol</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isActive = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-6 rounded-[32px] border-4 transition-all gap-3 bg-white ${isActive ? 'border-navy-900 shadow-2xl translate-y-[-4px]' : 'border-white shadow-xl shadow-gray-100/50 opacity-40 grayscale group hover:opacity-100 hover:grayscale-0'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isActive ? 'bg-navy-900 text-teal-400' : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                    <Icon size={24} strokeWidth={3} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-navy-900' : 'text-gray-300'}`}>{method.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Financial Breakdown Card */}
        <div className="bg-white p-10 rounded-[48px] shadow-2xl shadow-gray-200/50 border-4 border-white space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-100 transition-colors" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Sector Base Fare ({seats.length}x)</span>
              <span className="text-base font-black text-navy-900 tracking-tighter">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Network Service Fee</span>
              <span className="text-base font-black text-navy-900 tracking-tighter">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="pt-6 mt-6 border-t-4 border-dotted border-gray-50 flex justify-between items-center">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-navy-900 uppercase tracking-[0.4em]">Integrated Total</span>
                 <span className="text-[8px] font-black text-gray-200 uppercase tracking-widest leading-none mt-1">SDR Equivalent Optimized</span>
              </div>
              <span className="text-5xl font-black text-navy-900 tracking-tighter">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Execution Component */}
        <div className="pb-12 h-fit">
           <Link 
             to={isFormValid ? `/passenger/ticket-confirmation/${id}` : '#'}
             className={`w-full py-7 rounded-[32px] flex items-center justify-center gap-6 transition-all shadow-2xl active:scale-[0.98] relative overflow-hidden group ${isFormValid ? 'bg-navy-900 text-white shadow-navy-100' : 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none'}`}
           >
             {isFormValid && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
             
             <div className="flex flex-col items-end leading-none gap-1">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 decoration-teal-400">Phase III · Alpha</span>
                <span className="text-sm font-black uppercase tracking-widest">Execute Digital Manifest</span>
             </div>
             <div className={`w-12 h-12 rounded-[20px] flex items-center justify-center shadow-xl group-hover:translate-x-2 transition-transform ${isFormValid ? 'bg-white text-navy-900' : 'bg-gray-200'}`}>
               <ChevronLeft size={20} strokeWidth={4} className="rotate-180" />
             </div>
           </Link>

           <div className="mt-8 flex flex-col items-center gap-4 opacity-30 text-center">
              <div className="flex items-center gap-3">
                 <ShieldCheck size={16} className="text-teal-500" strokeWidth={3} />
                 <p className="text-[9px] font-black uppercase tracking-widest text-navy-900">Enterprise Encrypted Gateway 4.0</p>
              </div>
              <p className="text-[8px] font-black uppercase tracking-[0.5em] text-gray-300">VELOCITY TRANSIT SYSTEMS · MANIFEST FINALIZATION</p>
           </div>
        </div>
      </div>
    </div>
  );
}