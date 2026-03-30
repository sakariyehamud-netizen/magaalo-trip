import React from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] overflow-hidden"
    >
      {/* Background Animated Circles */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl -top-48 -right-48"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] rounded-full bg-teal-400/5 blur-3xl -bottom-96 -left-96"
      />

      <div className="relative flex flex-col items-center gap-12 z-10">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center shadow-2xl shadow-navy-900/50 relative z-10 overflow-hidden">
            <motion.div 
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className="text-6xl font-black text-navy-900"
            >
               M
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-teal-400" />
          </div>
          
          {/* Pulsing Ring */}
          <motion.div 
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-x-0 inset-y-0 rounded-[40px] border-4 border-white/30"
          />
        </motion.div>

        {/* Text Animation */}
        <div className="flex flex-col items-center gap-3">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-black text-white tracking-tighter"
          >
            Magaalo Trip
          </motion.h1>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white/40 text-[10px] uppercase font-black tracking-[0.6em]"
          >
            Regional Transit Alliance
          </motion.p>
        </div>

        {/* Loading Indicator */}
        <div className="relative w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-8">
           <motion.div 
             initial={{ left: "-100%" }}
             animate={{ left: "100%" }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
           />
        </div>

        {/* Floating Concept Bus */}
        <motion.div 
           initial={{ x: -100, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 1, duration: 1 }}
           className="mt-12 flex items-center gap-4 text-white/20"
        >
           <Bus size={24} />
           <span className="text-[9px] font-black uppercase tracking-widest">System Booting...</span>
        </motion.div>
      </div>

      {/* Version Tag */}
      <div className="absolute bottom-12 left-0 right-0 text-center">
         <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.5em]">v4.4.2 Build-77-A</span>
      </div>
    </motion.div>
  );
}

function Bus({ size }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
      <path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s1-1 1-2V7s0-1-1-1h-3"/><path d="M3 18h3s1-1 1-2V7s0-1-1-1H3s-1 0-1 1v9s0 2 1 2Z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>
    </svg>
  );
}
