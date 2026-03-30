import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Clock, User, Check, Info, ShieldCheck, Armchair } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const SEAT_ROWS = [
  { id: 1, seats: ['1A', '1B', 'empty', '1C', '1D'] },
  { id: 2, seats: ['2A', '2B', 'empty', '2C', '2D'] },
  { id: 3, seats: ['3A', '3B', 'empty', '3C', '3D'] },
  { id: 4, seats: ['4A', '4B', 'empty', '4C', '4D'] },
  { id: 5, seats: ['5A', '5B', 'empty', '5C', '5D'] },
  { id: 6, seats: ['6A', '6B', '6C', '6D', '6E'] }, // Last row 5 seats
];

const BOOKED_SEATS = ['2B', '4C', '1A'];
const PRICE_PER_SEAT = 15;

export default function SeatSelection() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSeat = (seatId) => {
    if (BOOKED_SEATS.includes(seatId) || seatId === 'empty' || seatId === 'driver') return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId));
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const totalPrice = selectedSeats.length * PRICE_PER_SEAT;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA] pb-32">
      {/* Premium Header */}
      <div className="bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] px-8 pt-16 pb-16 rounded-b-[60px] text-white overflow-hidden relative shadow-2xl shadow-indigo-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full blur-2xl -mb-24 -ml-12 pointer-events-none" />

        <div className="flex justify-between items-start mb-10 relative z-10">
           <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate(-1)} 
                className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-[28px] flex items-center justify-center border-2 border-white/20 shadow-xl active:scale-95 transition-all text-white hover:bg-white/20"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
              <div className="flex flex-col">
                 <h1 className="text-3xl font-black text-white tracking-tighter leading-none">Seat Selection</h1>
                 <div className="flex items-center gap-2 mt-2 opacity-60">
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Hargeisa → Berbera · #MT-{id}</span>
                 </div>
              </div>
           </div>
           
           <div className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-3 border border-white/20 shadow-xl">
              <Clock size={16} className="text-teal-400 animate-pulse" />
              <span className="text-xs font-black tracking-tighter">{formatTime(timeLeft)}</span>
           </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 bg-white/5 backdrop-blur-md p-4 rounded-3xl border border-white/10 w-fit">
           <ShieldCheck size={16} className="text-teal-400" />
           <p className="text-[9px] font-black uppercase tracking-widest text-white/60">Seats will be held during this countdown</p>
        </div>
      </div>

      {/* Internal Cabin View */}
      <div className="px-8 -mt-10 relative z-20 flex flex-col items-center">
        {/* Animated Legend */}
        <div className="bg-white px-8 py-5 rounded-[32px] shadow-xl shadow-gray-200/50 border border-white flex gap-10 mb-10 overflow-x-auto no-scrollbar max-w-full">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-5 h-5 rounded-lg border-2 border-gray-100 bg-white shadow-inner"></div>
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Available</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
             <div className="w-5 h-5 rounded-lg bg-navy-900 shadow-xl shadow-navy-100 flex items-center justify-center text-[8px] text-white font-black border border-white">
                <Check size={10} strokeWidth={4} />
             </div>
             <span className="text-[9px] font-black text-navy-900 uppercase tracking-widest">Selected</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
             <div className="w-5 h-5 rounded-lg bg-gray-100 shadow-inner flex items-center justify-center grayscale opacity-30">
                <Armchair size={10} className="text-gray-400" />
             </div>
             <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Reserved</span>
          </div>
        </div>

        {/* The Bus Body */}
        <div className="bg-white border-[10px] border-white rounded-[80px] p-10 shadow-2xl min-w-[320px] max-w-[380px] relative overflow-hidden group">
           {/* Glassmorphic Cabin Floor */}
           <div className="absolute inset-x-8 inset-y-8 bg-gray-50/50 rounded-[60px] pointer-events-none" />
           
           {/* Cockpit Area */}
           <div className="flex justify-between items-center mb-12 px-6 relative z-10">
              <div className="flex flex-col items-start gap-1 opacity-20 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <div className="w-16 h-3 bg-gray-300 rounded-full mb-1"></div>
                <div className="w-10 h-1.5 bg-gray-200 rounded-full"></div>
                <div className="w-6 h-1 bg-gray-100 rounded-full"></div>
              </div>
              <div className="w-14 h-14 bg-[#F6F8FA] rounded-[24px] border-4 border-white shadow-inner flex items-center justify-center grayscale text-gray-200">
                <User size={28} strokeWidth={2.5} />
              </div>
           </div>

           {/* Central Aisle & Seat Grid */}
           <div className="relative z-10 flex flex-col gap-6">
             {SEAT_ROWS.map((row) => (
               <div key={row.id} className="grid grid-cols-5 gap-4">
                 {row.seats.map((seatId, idx) => {
                   if (seatId === 'empty') return <div key={`aisle-${row.id}-${idx}`} className="w-12 pointer-events-none flex items-center justify-center opacity-5">
                      <div className="w-1 h-full bg-navy-900 rounded-full" />
                   </div>;
                   
                   const isBooked = BOOKED_SEATS.includes(seatId);
                   const isSelected = selectedSeats.includes(seatId);
                   
                   return (
                     <motion.button
                       key={seatId}
                       whileTap={{ scale: 0.85 }}
                       disabled={isBooked}
                       onClick={() => toggleSeat(seatId)}
                       className={`
                         w-12 h-12 rounded-2xl relative flex items-center justify-center text-[10px] font-black transition-all border-4
                         ${isBooked ? 'bg-[#F6F8FA] text-gray-200 border-white cursor-not-allowed shadow-inner grayscale' : 
                           isSelected ? 'bg-navy-900 text-white border-navy-700 shadow-2xl shadow-navy-200 translate-y-[-2px]' : 
                           'bg-white text-navy-900 border-[#F6F8FA] shadow-sm hover:border-teal-100 hover:shadow-md'}
                       `}
                     >
                       {isSelected ? (
                         <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                            <Check size={14} strokeWidth={4} />
                         </motion.div>
                       ) : (
                         <div className="flex flex-col items-center gap-0.5">
                            <Armchair size={14} className={isBooked ? 'opacity-20' : 'text-teal-500/30'} />
                            <span className="leading-none">{seatId}</span>
                         </div>
                       )}
                     </motion.button>
                   );
                 })}
               </div>
             ))}
           </div>

           {/* Rear Exhaust/Engine Indicator */}
           <div className="mt-16 flex flex-col items-center gap-3 relative z-10 opacity-10">
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-navy-900" />
                <div className="w-3 h-3 rounded-full bg-navy-900" />
             </div>
             <p className="text-[10px] font-black text-navy-900 uppercase tracking-[0.4em]">Engine Bay</p>
           </div>
        </div>

        <div className="mt-10 p-6 bg-white rounded-[32px] border border-gray-100 flex items-center gap-4 w-full max-w-[340px] shadow-sm">
           <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
              <Info size={24} />
           </div>
           <p className="text-[10px] font-black text-gray-400 uppercase leading-relaxed tracking-wider">
              Safety First: Please ensure you remain seated during transit. Seatbelts are mandatory across regional highways.
           </p>
        </div>
      </div>

      {/* Floating Tactical Bottom Bar */}
      <AnimatePresence>
        {selectedSeats.length > 0 && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 p-8 z-[100]"
          >
            <div className="bg-navy-900 p-8 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-navy-800 flex items-center justify-between overflow-hidden relative group">
              {/* Dynamic Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400 opacity-5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:opacity-10 transition-opacity" />
              
              <div className="flex flex-col gap-1 relative z-10">
                <span className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em]">Operational Total</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-white tracking-tighter">${totalPrice}</span>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">{selectedSeats.length} Units</span>
                     <span className="text-[8px] font-black text-white/20 uppercase tracking-tighter">Verified Manifest</span>
                  </div>
                </div>
              </div>
              
              <Link 
                to={`/passenger/checkout/${id}?seats=${selectedSeats.join(',')}`}
                className="bg-white px-10 py-5 rounded-[28px] flex items-center justify-center gap-6 shadow-2xl active:scale-95 transition-all text-navy-900 group/btn"
              >
                <div className="flex flex-col items-end leading-none gap-1">
                   <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-300">Phase II</span>
                   <span className="text-sm font-black uppercase tracking-widest">Begin Checkout</span>
                </div>
                <div className="w-10 h-10 bg-navy-900 rounded-2xl flex items-center justify-center group-hover/btn:translate-x-2 transition-transform shadow-xl">
                  <ChevronLeft size={18} strokeWidth={4} className="rotate-180 text-white" />
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}