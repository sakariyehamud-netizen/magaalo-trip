import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { DollarSign, Truck, BookOpen, Users, TrendingUp, ArrowUpRight, ArrowDownRight, MoreVertical, Search, Bell, Download, Filter, MapPin } from 'lucide-react';

const REVENUE_DATA = [
  { name: 'Mon', revenue: 4200, bookings: 120 },
  { name: 'Tue', revenue: 3800, bookings: 110 },
  { name: 'Wed', revenue: 5100, bookings: 145 },
  { name: 'Thu', revenue: 4600, bookings: 132 },
  { name: 'Fri', revenue: 6200, bookings: 178 },
  { name: 'Sat', revenue: 7800, bookings: 220 },
  { name: 'Sun', revenue: 7100, bookings: 198 },
];

const BOOKING_STATUS_DATA = [
  { name: 'Completed', value: 450, color: '#17A2A9' },
  { name: 'Scheduled', value: 200, color: '#0B3D91' },
  { name: 'Cancelled', value: 85, color: '#EF4444' },
];

const RECENT_BOOKINGS = [
  { id: 'BK-9182', passenger: 'Safar Hersi', route: 'Hargeisa → Berbera', date: 'Today, 08:32 AM', amount: 30, status: 'Confirmed' },
  { id: 'BK-9181', passenger: 'Nimco Ali', route: 'Berbera → Hargeisa', date: 'Today, 07:45 AM', amount: 15, status: 'Confirmed' },
  { id: 'BK-9170', passenger: 'Abdi Bile', route: 'Garowe → Bossaso', date: 'Yesterday, 04:20 PM', amount: 25, status: 'Completed' },
  { id: 'BK-9168', passenger: 'Fozia Faris', route: 'Mogadishu → Baidoa', date: 'Yesterday, 11:10 AM', amount: 45, status: 'Cancelled' },
  { id: 'BK-9165', passenger: 'Liban Noor', route: 'Hargeisa → Borama', date: '2 days ago', amount: 10, status: 'Completed' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Revenue', value: '$84,250', trend: '+14.5%', icon: DollarSign, color: 'text-[#17A2A9]', bg: 'bg-teal-50' },
          { label: 'Active Trips', value: '42', trend: '+2.4%', icon: Truck, color: 'text-[#0B3D91]', bg: 'bg-navy-50' },
          { label: 'Total Bookings', value: '1,284', trend: '+18.2%', icon: BookOpen, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Active Drivers', value: '128', trend: '+5.1%', icon: Users, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[48px] shadow-2xl shadow-gray-200/50 border border-gray-50 group hover:bg-navy-900 transition-all duration-500"
          >
            <div className={`w-16 h-16 rounded-[28px] ${stat.bg} ${stat.color} flex items-center justify-center mb-10 border-4 border-white shadow-xl group-hover:bg-white/20 group-hover:text-white group-hover:border-navy-800 transition-all duration-500 ring-2 ring-gray-50`}>
              <stat.icon size={28} strokeWidth={3} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] group-hover:text-white/40">{stat.label}</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-navy-900 leading-none tracking-tighter group-hover:text-white">{stat.value}</span>
                <div className="flex items-center gap-1 text-[#17A2A9] group-hover:text-teal-400">
                  <TrendingUp size={12} strokeWidth={3} />
                  <span className="text-[10px] font-black tracking-tighter">{stat.trend}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 flex flex-col gap-10 border border-gray-50">
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col gap-1">
               <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Revenue Overview</h3>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Global Network · Last 7 Days Analytics</p>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-3 px-8 py-3 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#0B3D91] shadow-sm border border-white hover:bg-navy-50 active:scale-95 transition-all"><Download size={14} strokeWidth={3} /> Export CSV</button>
              <button className="flex items-center gap-3 px-8 py-3 bg-gray-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-400 shadow-sm border border-white hover:bg-gray-100 active:scale-95 transition-all"><Filter size={14} strokeWidth={3} /> Daily</button>
            </div>
          </div>

          <div className="h-[320px] w-full -ml-4 pr-10">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#17A2A9" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#17A2A9" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B3D91" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0B3D91" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#F1F5F9" strokeDasharray="5 5" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 900, fill: '#CBD5E1', letterSpacing: '0.1em' }} 
                    dy={15}
                  />
                  <YAxis hide />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-navy-900 p-6 rounded-[32px] shadow-2xl border-4 border-white text-white flex flex-col gap-2">
                             <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black">${payload[0].value}</span>
                                <span className="text-[10px] uppercase font-black text-white/40">Revenue</span>
                             </div>
                             <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                                <span className="text-[10px] uppercase font-black text-teal-400">{payload[1].value} Bookings</span>
                             </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#17A2A9" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="bookings" stroke="#0B3D91" strokeWidth={5} fillOpacity={1} fill="url(#colorBook)" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 flex flex-col gap-10 border border-gray-50 text-center items-center">
           <div className="flex flex-col gap-1 w-full text-left">
              <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Booking Distribution</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Last 30 Days Cycle</p>
           </div>

           <div className="h-[280px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                      data={BOOKING_STATUS_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={15}
                      dataKey="value"
                      stroke="none"
                    >
                       {BOOKING_STATUS_DATA.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                           return (
                             <div className="bg-white px-6 py-3 rounded-2xl shadow-2xl border border-gray-100 flex flex-col gap-1">
                               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none">{payload[0].name}</span>
                               <span className="text-lg font-black text-navy-900">{payload[0].value} Cases</span>
                             </div>
                           );
                        }
                        return null;
                      }}
                    />
                 </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                 <span className="text-4xl font-black text-navy-900 leading-none">735</span>
                 <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</span>
              </div>
           </div>

           <div className="flex flex-col gap-4 w-full px-4">
              {BOOKING_STATUS_DATA.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center group cursor-default">
                   <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-black text-gray-500 group-hover:text-navy-900 transition-colors uppercase tracking-widest text-[10px]">{item.name}</span>
                   </div>
                   <span className="text-sm font-black text-navy-900 tracking-tighter group-hover:text-teal-500 transition-colors">{Math.round((item.value / 735) * 100)}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Recent Bookings Table Container */}
      <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border border-gray-50 flex flex-col gap-10">
         <div className="flex justify-between items-center px-2">
            <h3 className="text-2xl font-black text-navy-900 tracking-tighter">Live Bookings Feed</h3>
            <div className="relative group min-w-[320px]">
               <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#17A2A9] transition-colors">
                  <Search size={18} strokeWidth={3} />
               </div>
               <input 
                 type="text" 
                 placeholder="Search by ID, Name or Route..." 
                 className="w-full pl-16 pr-6 py-4 bg-[#F6F8FA] border-2 border-transparent rounded-2xl text-navy-900 font-bold placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-[#17A2A9]/20 transition-all text-sm outline-none ring-4 ring-transparent focus:ring-teal-50 shadow-inner shadow-gray-100"
               />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b-2 border-gray-50">
                     <th className="pb-6 px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Reference ID</th>
                     <th className="pb-6 px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Passenger Name</th>
                     <th className="pb-6 px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Trip Path</th>
                     <th className="pb-6 px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Journey Date</th>
                     <th className="pb-6 px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Amount</th>
                     <th className="pb-6 px-4 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Live Status</th>
                     <th className="pb-6 px-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {RECENT_BOOKINGS.map((booking, idx) => (
                    <tr key={booking.id} className="group hover:bg-[#F6F8FA] transition-colors active:scale-[0.995]">
                       <td className="py-8 px-4">
                          <span className="text-sm font-black text-[#0B3D91] tracking-tighter font-mono bg-navy-50 px-3 py-1.5 rounded-lg border border-navy-100/30 font-semibold">{booking.id}</span>
                       </td>
                       <td className="py-8 px-4 font-black text-navy-900">{booking.passenger}</td>
                       <td className="py-8 px-4">
                          <div className="flex items-center gap-3">
                             <span className="text-xs font-black text-gray-400 bg-white px-2 py-1 rounded-lg border border-gray-50 shadow-sm">{booking.route}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4 font-black text-gray-400 text-xs uppercase tracking-widest">{booking.date}</td>
                       <td className="py-8 px-4">
                          <span className="text-lg font-black text-navy-900 tracking-tighter">${booking.amount}</span>
                       </td>
                       <td className="py-8 px-4">
                          <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border-2 border-white w-fit shadow-sm ${booking.status === 'Confirmed' ? 'bg-teal-50 text-[#17A2A9]' : booking.status === 'Completed' ? 'bg-navy-50 text-[#0B3D91]' : 'bg-red-50 text-red-500'}`}>
                             <div className={`w-2 h-2 rounded-full ${booking.status === 'Confirmed' ? 'bg-[#17A2A9] animate-pulse' : booking.status === 'Completed' ? 'bg-[#0B3D91]' : 'bg-red-500'}`}></div>
                             <span className="text-[10px] font-black uppercase tracking-widest leading-none">{booking.status}</span>
                          </div>
                       </td>
                       <td className="py-8 px-4 text-center">
                          <button className="p-3 text-gray-100 hover:text-navy-900 group-hover:text-gray-400 transition-colors bg-white rounded-xl shadow-sm border border-gray-50"><MoreVertical size={20} /></button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <button className="w-full py-8 mt-4 bg-white border-4 border-navy-50 rounded-[40px] text-navy-900 font-black uppercase tracking-[0.5em] text-[10px] shadow-2xl shadow-gray-200/50 flex items-center justify-center gap-8 group active:scale-[0.99] transition-all">
            <div className="w-8 h-8 rounded-xl bg-navy-50 flex items-center justify-center text-navy-900 group-hover:rotate-12 transition-transform">
               <Users size={16} strokeWidth={3} />
            </div>
            View Entire Booking Database
         </button>
      </div>
    </div>
  );
}