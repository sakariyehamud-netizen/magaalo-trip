import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Calendar, ChevronLeft, ArrowUpRight, ArrowDownRight, MoreVertical, Wallet, Filter, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EARNINGS_DATA = [
  { day: 'Mon', amount: 150 },
  { day: 'Tue', amount: 230 },
  { day: 'Wed', amount: 180 },
  { day: 'Thu', amount: 320 },
  { day: 'Fri', amount: 280 },
  { day: 'Sat', amount: 450 },
  { day: 'Sun', amount: 380 },
];

const RECENT_EARNINGS = [
  { id: 1, route: 'Hargeisa → Berbera', date: 'Today, 2:40 PM', amount: 45, items: '3 Seats', status: 'Settled' },
  { id: 2, route: 'Berbera → Hargeisa', date: 'Today, 11:15 AM', amount: 120, items: '8 Seats', status: 'Settled' },
  { id: 3, route: 'Hargeisa → Garowe', date: 'Yesterday, 8:00 AM', amount: 245, items: '12 Seats', status: 'Settled' },
];

export default function DriverEarnings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-24">
      {/* Header */}
      <div className="brand-gradient pt-16 pb-32 px-8 rounded-b-[60px] text-white shadow-2xl shadow-navy-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl"></div>
        
        <div className="flex justify-between items-start mb-10 relative z-10">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)} 
                className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-[28px] flex items-center justify-center border-4 border-white/20 shadow-2xl active:scale-95 transition-all"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <div className="flex flex-col">
                 <h1 className="text-3xl font-black text-white leading-none">Earnings</h1>
                 <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-2">Payout Schedule · Weekly</p>
              </div>
           </div>
           <button className="w-14 h-14 bg-white rounded-[28px] flex items-center justify-center border-4 border-white/20 shadow-xl text-[#0B3D91] active:scale-95 transition-all">
             <Filter size={24} strokeWidth={2.5} />
           </button>
        </div>

        <div className="flex flex-col gap-2 relative z-10 text-center items-center">
           <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[28px] flex items-center justify-center text-teal-400 border-4 border-white/10 mb-4 shadow-2xl">
              <DollarSign size={32} strokeWidth={3} />
           </div>
           <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em] leading-none mb-1">Total Balance Ready</span>
           <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white tracking-tighter">$1,245<span className="text-2xl text-white/50">.80</span></span>
           </div>
           <p className="text-[10px] font-black text-teal-400 uppercase tracking-widest leading-none mt-2 flex items-center gap-2">
              <TrendingUp size={12} strokeWidth={4} />
              +12.5% increase this week
           </p>
        </div>
      </div>

      <div className="px-8 -mt-16 relative z-20 space-y-10">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-6">
           <motion.div 
             whileHover={{ y: -5 }}
             className="bg-white p-8 rounded-[48px] shadow-2xl shadow-gray-200/50 flex flex-col gap-4 border border-gray-50 group hover:bg-navy-900 transition-all duration-500"
           >
              <div className="w-14 h-14 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-500 shadow-inner group-hover:bg-white/20 group-hover:text-white transition-all">
                 <ArrowUpRight size={24} strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 group-hover:text-white/40">Today</span>
                 <span className="text-2xl font-black text-navy-900 leading-none group-hover:text-white tracking-tighter">$165.20</span>
              </div>
           </motion.div>
           <motion.div 
             whileHover={{ y: -5 }}
             className="bg-white p-8 rounded-[48px] shadow-2xl shadow-gray-200/50 flex flex-col gap-4 border border-gray-50 group hover:bg-[#17A2A9] transition-all duration-500"
           >
              <div className="w-14 h-14 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-500 shadow-inner group-hover:bg-white/20 group-hover:text-white transition-all">
                 <Calendar size={24} strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 group-hover:text-white/40">This Month</span>
                 <span className="text-2xl font-black text-navy-900 leading-none group-hover:text-white tracking-tighter">$4,860</span>
              </div>
           </motion.div>
        </div>

        {/* Analytics Chart Container */}
        <div className="bg-white p-10 rounded-[60px] shadow-2xl shadow-gray-100 border border-gray-50 flex flex-col gap-10">
           <div className="flex justify-between items-center px-2">
              <div className="flex flex-col gap-1">
                 <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Earnings Trend</h3>
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Last 7 Journey Days</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-end">
                    <span className="text-sm font-black text-teal-500">+$120.40</span>
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest leading-none">Peak Day</span>
                 </div>
              </div>
           </div>

           <div className="h-[240px] w-full -ml-4 pr-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EARNINGS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="5 5" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#CBD5E1', letterSpacing: '0.1em' }} 
                    dy={15}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'rgba(11, 61, 145, 0.03)', radius: 24 }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-navy-900 px-4 py-2 rounded-xl shadow-2xl border-4 border-white text-white font-black text-xs">
                            ${payload[0].value}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="amount" 
                    radius={[20, 20, 20, 20]} 
                    barSize={32}
                  >
                    {EARNINGS_DATA.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.amount > 300 ? '#17A2A9' : '#0B3D91'} 
                        fillOpacity={0.8}
                        className="transition-all duration-300 hover:fill-opacity-100"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Recent Settlements List */}
        <div className="flex flex-col gap-6 pt-4">
            <div className="flex justify-between items-center px-2">
               <h4 className="text-xl font-black text-navy-900 tracking-tight">Recent Settlements</h4>
               <button className="text-[10px] font-black text-navy-900/40 uppercase tracking-widest hover:text-navy-900 transition-colors">See Ledger</button>
            </div>
            
            <div className="space-y-4">
               {RECENT_EARNINGS.map((item) => (
                 <div key={item.id} className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm flex items-center justify-between group hover:shadow-xl hover:shadow-gray-200/50 transition-all active:scale-[0.98]">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-gray-50 rounded-[28px] flex items-center justify-center text-[#17A2A9] group-hover:bg-[#17A2A9] group-hover:text-white transition-all flex flex-col gap-0.5 border-4 border-white shadow-inner shadow-gray-100 ring-2 ring-gray-50">
                          <CreditCard size={20} />
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-base font-black text-navy-900 leading-none group-hover:translate-x-1 transition-transform">{item.route}</span>
                          <div className="flex items-center gap-3">
                             <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">{item.date}</span>
                             <div className="w-1 h-1 bg-gray-50 rounded-full"></div>
                             <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest leading-none">{item.items}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="flex flex-col items-end">
                          <span className="text-xl font-black text-navy-900 group-hover:text-[#17A2A9] transition-colors leading-none mb-1">+${item.amount}</span>
                          <span className="text-[9px] font-black text-teal-500 uppercase tracking-widest leading-none group-hover:bg-teal-50 group-hover:px-2 group-hover:py-0.5 rounded-lg transition-all">{item.status}</span>
                       </div>
                       <MoreVertical size={18} className="text-gray-100 group-hover:text-gray-400 transition-colors" />
                    </div>
                 </div>
               ))}
            </div>
            
            <button className="w-full py-6 mt-6 bg-white border-4 border-navy-50 rounded-[40px] text-navy-900 font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-gray-200/50 flex items-center justify-center gap-6 group active:scale-95 transition-all">
               <div className="w-8 h-8 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900 group-hover:rotate-12 transition-transform">
                  <Wallet size={16} />
               </div>
               Request Immediate Payout
            </button>
        </div>
      </div>
    </div>
  );
}