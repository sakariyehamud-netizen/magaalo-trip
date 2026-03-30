import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Truck, Shield, ArrowRight, Zap, Globe, ShieldCheck } from 'lucide-react';

export default function Portal() {
  const portalCards = [
    {
      title: 'Passenger Portal',
      description: 'Book your next voyage across the regional transit network with real-time tracking.',
      icon: User,
      to: '/passenger',
      color: 'from-[#0B3D91] to-[#17A2A9]',
      btnColor: 'bg-[#17A2A9]',
      tag: 'B2C · Travel Hub'
    },
    {
      title: 'Driver Cockpit',
      description: 'The ultimate operational toolkit for fleet pilots. Manifests, telemetry, and smart earnings.',
      icon: Truck,
      to: '/driver',
      color: 'from-[#17A2A9] to-[#059669]',
      btnColor: 'bg-[#059669]',
      tag: 'B2B · Operations'
    },
    {
      title: 'Global Command',
      description: 'Complete ecosystem oversight. Logistics, analytics, and fleet management at scale.',
      icon: Shield,
      to: '/admin',
      color: 'from-[#1e293b] to-[#334155]',
      btnColor: 'bg-navy-900',
      tag: 'Control · Admin'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-teal-50/50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl w-full relative z-10 space-y-16">
        <div className="flex flex-col items-center text-center space-y-4">
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="w-20 h-20 bg-white rounded-[28px] shadow-2xl flex items-center justify-center text-navy-900 text-4xl font-black border-4 border-white mb-4"
           >
              M
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-black text-navy-900 tracking-tighter leading-none"
           >
             Magaalo Velocity
           </motion.h1>
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="flex items-center gap-4 py-2 px-6 bg-white rounded-full shadow-sm border border-gray-100"
           >
              <Zap size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Integrated Ecosystem Apex</span>
           </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           {portalCards.map((card, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 + idx * 0.1 }}
               whileHover={{ y: -10 }}
               className="group"
             >
               <Link to={card.to} className="block relative">
                 <div className="bg-white p-12 rounded-[60px] shadow-2xl shadow-gray-200/50 border-4 border-white group-hover:border-gray-50 transition-all h-full flex flex-col gap-10 overflow-hidden">
                    {/* Animated Gradient Background */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 rounded-full -mr-16 -mt-16 blur-2xl transition-opacity duration-700`} />
                    
                    <div className="flex justify-between items-start">
                       <div className={`w-20 h-20 rounded-[32px] bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-2xl group-hover:rotate-6 transition-transform duration-500`}>
                          <card.icon size={36} strokeWidth={2.5} />
                       </div>
                       <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{card.tag}</span>
                    </div>

                    <div className="space-y-4">
                       <h2 className="text-3xl font-black text-navy-900 tracking-tighter">{card.title}</h2>
                       <p className="text-sm font-bold text-gray-400 leading-relaxed">{card.description}</p>
                    </div>

                    <div className="mt-auto pt-8 flex items-center justify-between">
                       <div className={`w-12 h-12 rounded-2xl ${card.btnColor} text-white flex items-center justify-center shadow-xl group-hover:translate-x-2 transition-transform`}>
                          <ArrowRight size={20} strokeWidth={3} />
                       </div>
                       <div className="flex -space-x-3 opacity-30 group-hover:opacity-100 transition-opacity">
                          {[1,2,3].map(i => (
                             <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white" />
                          ))}
                       </div>
                    </div>
                 </div>
               </Link>
             </motion.div>
           ))}
        </div>

        <div className="flex flex-col items-center gap-6 pt-12">
           <div className="flex items-center gap-8 text-gray-300">
              <div className="flex items-center gap-2">
                 <Globe size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Global Network</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-100" />
              <div className="flex items-center gap-2">
                 <ShieldCheck size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Secure</span>
              </div>
           </div>
           <p className="text-[8px] font-black uppercase tracking-[0.8em] text-gray-300">Powered by Velocity Transit Systems</p>
        </div>
      </div>
    </div>
  );
}
