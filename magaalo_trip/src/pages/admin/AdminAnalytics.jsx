import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { TrendingUp, DollarSign, Activity, Users, Truck, ArrowUpRight, ArrowDownRight, MoreVertical, Download, Filter, Map, Compass, Star, Award } from 'lucide-react';

const REVENUE_BY_ROUTE = [
  { route: 'HGE-BER', revenue: 45000 },
  { route: 'GAR-BOS', revenue: 38000 },
  { route: 'MOG-BAI', revenue: 52000 },
  { route: 'HGE-BOR', revenue: 29000 },
  { route: 'BER-HGE', revenue: 41000 },
];

const BOOKINGS_OVER_TIME = [
  { month: 'Jan', bookings: 450 },
  { month: 'Feb', bookings: 520 },
  { month: 'Mar', bookings: 610 },
  { month: 'Apr', bookings: 580 },
  { month: 'May', bookings: 720 },
  { month: 'Jun', bookings: 850 },
  { month: 'Jul', bookings: 980 },
];

const TOP_DRIVERS = [
  { name: 'Dahir Hassan', earnings: 14200, rating: 4.98, trips: 142 },
  { name: 'Nimco Ali', earnings: 11500, rating: 4.85, trips: 112 },
  { name: 'Abdi Bile', earnings: 9800, rating: 4.70, trips: 89 },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors"></div>
         
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 bg-indigo-500 rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-indigo-100 border-4 border-white transform rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500 ring-2 ring-gray-50">
               <Activity size={36} strokeWidth={3} />
            </div>
            <div className="flex flex-col gap-1">
               <h1 className="text-4xl font-black text-navy-900 tracking-tighter leading-none">Intelligence Hub</h1>
               <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 bg-[#17A2A9] px-3 py-1 rounded-lg text-white shadow-sm border border-teal-400">
                     <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest leading-none">Live Data Link</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Global Network Analytics</span>
               </div>
            </div>
         </div>

         <div className="flex gap-4 relative z-10 w-full lg:w-fit">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-navy-900 text-white rounded-[32px] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-navy-200 active:scale-95 transition-all group/btn">
               <Download size={20} strokeWidth={4} />
               Global Report Audit
            </button>
         </div>
      </div>

      {/* Main Charts Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
            <div className="flex justify-between items-center px-2">
               <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Gross Route Performance</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Net Revenue Distribution · Quarterly Audit</p>
               </div>
               <div className="w-12 h-12 bg-navy-50 rounded-2xl flex items-center justify-center text-[#0B3D91] shadow-inner-lg border-2 border-white ring-1 ring-navy-100"><Map size={24} strokeWidth={3} /></div>
            </div>

            <div className="h-[320px] w-full -ml-4 pr-10 mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REVENUE_BY_ROUTE} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                     <CartesianGrid horizontal={false} stroke="#F1F5F9" strokeDasharray="10 10" />
                     <XAxis hide type="number" />
                     <YAxis 
                       dataKey="route" 
                       type="category" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B', letterSpacing: '0.1em' }} 
                       width={80}
                     />
                     <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                             return (
                               <div className="bg-navy-900 p-6 rounded-[32px] shadow-2xl border-4 border-white text-white flex flex-col gap-1">
                                 <span className="text-[10px] uppercase font-black text-white/40 tracking-widest">Net Revenue</span>
                                 <span className="text-2xl font-black">${payload[0].value.toLocaleString()}</span>
                               </div>
                             );
                          }
                          return null;
                        }}
                     />
                     <Bar 
                        dataKey="revenue" 
                        radius={[0, 20, 20, 0]} 
                        barSize={32}
                     >
                        {REVENUE_BY_ROUTE.map((entry, index) => (
                           <Cell 
                             key={`cell-${index}`} 
                             fill={index % 2 === 0 ? '#17A2A9' : '#0B3D91'} 
                             fillOpacity={0.8}
                             className="transition-all duration-300 hover:fill-opacity-100"
                           />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
            <div className="flex justify-between items-center px-2">
               <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Volume Velocity</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Bookings Cycle · Seasonally Adjusted</p>
               </div>
               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 shadow-inner-lg border-2 border-white ring-1 ring-indigo-100"><Activity size={24} strokeWidth={3} /></div>
            </div>

            <div className="h-[320px] w-full -ml-8 pr-12 mt-4">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={BOOKINGS_OVER_TIME} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                     <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="10 10" />
                     <XAxis 
                       dataKey="month" 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B', letterSpacing: '0.1em' }} 
                       dy={15}
                     />
                     <YAxis hide />
                     <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                             return (
                               <div className="bg-indigo-500 p-6 rounded-[32px] shadow-2xl border-4 border-white text-white flex flex-col gap-1">
                                 <span className="text-[10px] uppercase font-black text-white/60 tracking-widest whitespace-nowrap">Volume Log</span>
                                 <span className="text-2xl font-black">{payload[0].value} Cases</span>
                               </div>
                             );
                          }
                          return null;
                        }}
                     />
                     <Line 
                        type="monotone" 
                        dataKey="bookings" 
                        stroke="#6366f1" 
                        strokeWidth={6} 
                        dot={{ r: 8, stroke: '#6366f1', strokeWidth: 4, fill: '#fff' }} 
                        activeDot={{ r: 12, stroke: '#6366f1', strokeWidth: 4, fill: '#fff' }}
                        className="transition-all duration-300"
                     />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* Driver Performance Matrix */}
      <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
         <div className="flex justify-between items-center px-4">
            <div className="flex flex-col gap-1">
               <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Elite Partner Matrix</h3>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Net Performance & Revenue Efficiency Logic</p>
            </div>
            <button className="p-4 px-8 bg-[#F6F8FA] rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0B3D91] shadow-sm border border-white hover:bg-navy-50 active:scale-95 transition-all">Audit Global Tier</button>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOP_DRIVERS.map((driver, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#F6F8FA] p-8 rounded-[48px] border-4 border-white shadow-inner-lg flex flex-col items-center text-center gap-6 group hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
              >
                 <div className="relative">
                    <div className="w-24 h-24 rounded-[36px] bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-navy-100 border-4 border-white group-hover:rotate-6 transition-transform">
                       {driver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-teal-500 text-white border-4 border-white flex items-center justify-center shadow-xl shadow-teal-500/10">
                       <Award size={18} strokeWidth={3} />
                    </div>
                 </div>

                 <div className="flex flex-col gap-1">
                    <h4 className="text-xl font-black text-navy-900 group-hover:text-[#17A2A9] transition-colors">{driver.name}</h4>
                    <div className="flex items-center justify-center gap-3">
                       <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-[10px] font-black text-gray-400">{driver.rating} Global Score</span>
                       </div>
                    </div>
                 </div>

                 <div className="w-full grid grid-cols-2 gap-4 py-6 border-t border-gray-100 border-dashed mt-2">
                    <div className="flex flex-col items-center">
                       <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 leading-none text-[8px]">Net Earnings</span>
                       <span className="text-lg font-black text-navy-900 tracking-tighter leading-none">${driver.earnings.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center">
                       <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 leading-none text-[8px]">Journeys Logged</span>
                       <span className="text-lg font-black text-indigo-500 tracking-tighter leading-none">{driver.trips}</span>
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>

         <div className="py-8 flex flex-col items-center gap-6 opacity-30 group cursor-default">
            <div className="flex gap-2">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="w-4 h-1 rounded-full bg-gray-200 group-hover:bg-[#17A2A9] transition-all" style={{ transitionDelay: `${i * 0.1}s` }}></div>
               ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 group-hover:text-navy-900 transition-colors">Manifest Analytics Root Node Locked</p>
         </div>
      </div>
    </div>
  );
}