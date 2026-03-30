import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, QrCode, MapPin, Bus, User, Calendar, Clock, Star, XCircle, MoreVertical, Share2, Download } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function TicketDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Logic to determine status based on ID or Mock
  const isCompleted = id === '2';
  const isCancelled = id === '3';
  const isUpcoming = !isCompleted && !isCancelled;

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-12 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 border-b border-gray-100 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 hover:bg-gray-100 transition-colors">
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <div className="flex flex-col">
             <h1 className="text-xl font-extrabold text-[#0B3D91]">Ticket Detail</h1>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-xs">MT-{id}V914</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 text-gray-400 hover:text-navy-900 transition-colors">
             <Share2 size={20} />
           </button>
           <button className="p-2 text-gray-400 hover:text-navy-900 transition-colors">
             <Download size={20} />
           </button>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6 flex-1 max-w-lg mx-auto w-full">
        {/* Physical Ticket View */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full bg-white rounded-[40px] shadow-2xl shadow-gray-200/80 border border-gray-50 overflow-hidden relative"
        >
          {/* Status Overlay */}
          <div className="absolute top-0 right-0 p-8 pt-10">
            <div className={`px-4 py-2 rounded-2xl flex items-center gap-2 border shadow-sm ${isUpcoming ? 'bg-teal-50 border-teal-100 text-teal-600' : isCompleted ? 'bg-navy-50 border-navy-100 text-[#0B3D91]' : 'bg-red-50 border-red-100 text-red-500'}`}>
              <div className={`w-2 h-2 rounded-full ${isUpcoming ? 'bg-teal-500 animate-pulse' : isCompleted ? 'bg-[#0B3D91]' : 'bg-red-500'}`}></div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">{isUpcoming ? 'Scheduled' : isCompleted ? 'Completed' : 'Cancelled'}</span>
            </div>
          </div>

          <div className="p-10 space-y-12">
            <div className="flex justify-between items-center text-left pt-6">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-navy-900 leading-none">HGE</span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Hargeisa</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-4 text-gray-200 px-6">
                 <div className="w-full h-0.5 bg-gray-50 relative">
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-500 flex flex-col items-center gap-2">
                     <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                       <Bus size={20} />
                     </div>
                   </div>
                 </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-4xl font-black text-navy-900 leading-none">BER</span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Berbera</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-10 border-t border-gray-50 pt-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                   <Calendar size={20} />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 text-xs">Journey Date</span>
                   <span className="text-sm font-black text-navy-900 tracking-tight">24 Oct, 2024</span>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                   <Clock size={20} />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 text-xs">Departure</span>
                   <span className="text-sm font-black text-navy-900 tracking-tight">08:00 AM</span>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
                   <User size={20} />
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 text-xs">Boarding Point</span>
                   <span className="text-sm font-black text-navy-900 tracking-tight">Main Terminal (G1)</span>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#17A2A9] bg-teal-50 border-2 border-white shadow-sm">
                   <span className="text-xs font-black">2A</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1 text-xs">Seat Number</span>
                   <span className="text-sm font-black text-[#17A2A9] tracking-tight">Premium VIP</span>
                 </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center gap-6 pt-12 border-t border-gray-100 border-dashed relative">
              <div className="absolute -left-14 top-0 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50 shadow-inner"></div>
              <div className="absolute -right-14 top-0 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50 shadow-inner"></div>
              
              <div className={`p-6 bg-navy-50 rounded-[40px] border-4 border-white shadow-xl relative overflow-hidden ${isCancelled ? 'opacity-30 grayscale' : ''}`}>
                 {isCancelled && (
                   <div className="absolute inset-0 flex items-center justify-center z-10 rotate-12">
                     <span className="bg-red-500 text-white px-8 py-2 font-black text-xl border-4 border-red-600 shadow-lg">CANCELLED</span>
                   </div>
                 )}
                 <QrCode size={140} className="text-navy-900" />
              </div>
              <div className="flex flex-col items-center">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">Scan for Check-in</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full bg-navy-900"></div>
                  <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                  <div className="w-2 h-2 rounded-full bg-navy-900"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Controls based on status */}
        <div className="w-full flex flex-col gap-4">
          {isUpcoming && (
            <>
              <Link 
                to={`/live-tracking/${id}`}
                className="w-full py-5 brand-gradient text-white rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl shadow-navy-900/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              >
                <MapPin size={18} />
                Find My Bus
              </Link>
              <button 
                className="w-full py-4 border-2 border-red-50 text-red-400 font-extrabold rounded-3xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                onClick={() => alert('Cancelling ticket...')}
              >
                <XCircle size={16} />
                Cancel Reservation
              </button>
            </>
          )}

          {isCompleted && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[40px] shadow-lg shadow-gray-200 border border-gray-50 flex flex-col items-center text-center gap-6"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-black text-navy-900 leading-tight text-xl">Enjoyed your trip?</h3>
                <p className="text-gray-400 text-sm font-semibold">Tell us about your experience</p>
              </div>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="p-1"
                  >
                    <Star 
                      size={32} 
                      className={`${(hovered || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-100 fill-gray-100'}`}
                      strokeWidth={2}
                    />
                  </motion.button>
                ))}
              </div>

              <div className="w-full space-y-4">
                 <textarea 
                   placeholder="Add a comment (Optional)"
                   className="w-full p-6 bg-gray-50 border border-gray-100 rounded-[32px] text-sm focus:outline-none focus:ring-4 focus:ring-navy-50 min-h-[120px] transition-all font-semibold"
                 ></textarea>
                 <button className="w-full py-4 bg-[#0B3D91] text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-lg shadow-navy-300">
                   Submit Review
                 </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}