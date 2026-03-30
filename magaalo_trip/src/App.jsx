import { BrowserRouter, Routes, Route, Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Search, Ticket, User, Map, Compass, BookOpen, Bell, DollarSign, Settings, Users, PieChart, Info, MapPin, Truck, Star, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Pages imports
import PassengerHome from './pages/passenger/PassengerHome';
import BusList from './pages/passenger/BusList';
import SeatSelection from './pages/passenger/SeatSelection';
import Checkout from './pages/passenger/Checkout';
import TicketConfirmation from './pages/passenger/TicketConfirmation';
import MyTickets from './pages/passenger/MyTickets';
import TicketDetail from './pages/passenger/TicketDetail';
import LiveTracking from './pages/passenger/LiveTracking';
import PassengerProfile from './pages/passenger/PassengerProfile';

import DriverHome from './pages/driver/DriverHome';
import DriverTripDetail from './pages/driver/DriverTripDetail';
import DriverTracking from './pages/driver/DriverTracking';
import DriverBookings from './pages/driver/DriverBookings';
import DriverEarnings from './pages/driver/DriverEarnings';
import DriverNotifications from './pages/driver/DriverNotifications';
import DriverProfile from './pages/driver/DriverProfile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoutes from './pages/admin/AdminRoutes';
import AdminTrips from './pages/admin/AdminTrips';
import AdminDrivers from './pages/admin/AdminDrivers';
import AdminBookings from './pages/admin/AdminBookings';
import AdminTracking from './pages/admin/AdminTracking';
import AdminReviews from './pages/admin/AdminReviews';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import AdminDriverProfile from './pages/admin/AdminDriverProfile';
import AdminCargo from './pages/admin/AdminCargo';
import Portal from './pages/Portal';

// --- Shared Layouts
function PassengerLayout() {
  const location = useLocation();
  const hideNavOn = ['/passenger/seat-selection', '/passenger/checkout', '/passenger/ticket-confirmation', '/passenger/ticket/', '/passenger/live-tracking'];
  const showNav = !hideNavOn.some(path => location.pathname.includes(path));

  return (
    <div className="min-h-screen bg-[#F6F8FA] w-full pb-20 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {showNav && (
        <div className="fixed bottom-0 left-0 right-0 glass-nav shadow-[0_-4px_24px_rgba(0,0,0,0.05)] z-50 px-6 py-3 pb-6 flex justify-between items-center rounded-t-3xl border-t border-gray-100">
          {[
            { to: '/passenger', icon: Home, label: 'Home' },
            { to: '/passenger/search', icon: Search, label: 'Search' },
            { to: '/passenger/my-tickets', icon: Ticket, label: 'Tickets' },
            { to: '/passenger/profile', icon: User, label: 'Profile' }
          ].map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="relative flex flex-col items-center gap-1 min-w-[64px]">
                {isActive && (
                  <motion.div layoutId="nav-indicator" className="absolute -top-3 w-8 h-1 bg-[#17A2A9] rounded-b-full scale-100" />
                )}
                <Icon size={24} className={`transition-all ${isActive ? 'text-[#0B3D91] scale-110' : 'text-gray-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] sm:text-xs font-semibold ${isActive ? 'text-[#0B3D91]' : 'text-gray-500'}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DriverLayout() {
  const location = useLocation();
  const hideNavOn = ['/driver/trip/'];
  const showNav = !hideNavOn.some(path => location.pathname.includes(path));

  return (
    <div className="min-h-screen bg-[#F6F8FA] w-full pb-20 relative overflow-hidden">
      <Outlet />
      {showNav && (
        <div className="fixed bottom-0 left-0 right-0 glass-nav shadow-[0_-4px_24px_rgba(0,0,0,0.05)] z-50 px-6 py-3 pb-6 flex justify-between items-center rounded-t-3xl border-t border-gray-100">
          {[
            { to: '/driver', icon: Home, label: 'Dashboard' },
            { to: '/driver/tracking', icon: Compass, label: 'Tracking' },
            { to: '/driver/bookings', icon: BookOpen, label: 'Bookings' },
            { to: '/driver/profile', icon: User, label: 'Profile' }
          ].map((item) => {
            const isActive = location.pathname === item.to || (item.to !== '/driver' && location.pathname.startsWith(item.to));
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="relative flex flex-col items-center gap-1 min-w-[64px]">
                {isActive && (
                  <motion.div layoutId="driver-nav-indicator" className="absolute -top-3 w-8 h-1 bg-[#17A2A9] rounded-b-full scale-100" />
                )}
                <Icon size={24} className={`transition-all ${isActive ? 'text-[#0B3D91] scale-110' : 'text-gray-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] sm:text-xs font-semibold ${isActive ? 'text-[#0B3D91]' : 'text-gray-500'}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AdminLayout() {
  const location = useLocation();
  const menuItems = [
    { to: '/admin', icon: PieChart, label: 'Dashboard' },
    { to: '/admin/routes', icon: Map, label: 'Routes Management' },
    { to: '/admin/trips', icon: Compass, label: 'Trips Management' },
    { to: '/admin/drivers', icon: Truck, label: 'Drivers Management' },
    { to: '/admin/bookings', icon: BookOpen, label: 'Bookings Management' },
    { to: '/admin/tracking', icon: MapPin, label: 'Live Fleet Tracking' },
    { to: '/admin/cargo', icon: Truck, label: 'Cargo Logistics' },
    { to: '/admin/reviews', icon: Star, label: 'Reviews' },
    { to: '/admin/analytics', icon: DollarSign, label: 'Analytics' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      <aside className="w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col hidden md:flex">
        <div className="p-6">
          <h1 className="text-xl font-extrabold text-[#0B3D91] flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#0B3D91] text-white flex items-center justify-center">M</span>
            Magaalo Admin
          </h1>
        </div>
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative overflow-hidden ${isActive ? 'bg-indigo-50 text-[#0B3D91] font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#6366f1] rounded-r-lg" />}
                <Icon size={20} className={isActive ? 'text-[#6366f1]' : 'text-gray-400'} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:text-red-500 text-sm font-medium transition-colors w-full">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-[#F6F8FA] overflow-y-auto w-full">
        <header className="h-16 glass-nav border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 w-full">
          <h2 className="text-lg font-bold text-gray-800 hidden md:block">{menuItems.find(m => m.to === location.pathname)?.label || 'Admin Panel'}</h2>
          <div className="flex md:hidden items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#0B3D91] text-white flex items-center justify-center font-bold">M</span>
            <span className="font-extrabold text-[#0B3D91]">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 relative text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-4">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#0B3D91] to-[#17A2A9] rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white">A</div>
            </div>
          </div>
        </header>
        <div className="p-4 sm:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Entry Portal */}
        <Route path="/" element={<Portal />} />

        {/* Passenger App */}
        <Route path="/passenger" element={<PassengerLayout />}>
          <Route index element={<PassengerHome />} />
          <Route path="search" element={<BusList />} />
          <Route path="seat-selection/:id" element={<SeatSelection />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="ticket-confirmation/:id" element={<TicketConfirmation />} />
          <Route path="my-tickets" element={<MyTickets />} />
          <Route path="ticket/:id" element={<TicketDetail />} />
          <Route path="live-tracking/:id" element={<LiveTracking />} />
          <Route path="profile" element={<PassengerProfile />} />
        </Route>

        {/* Driver App */}
        <Route path="/driver" element={<DriverLayout />}>
          <Route index element={<DriverHome />} />
          <Route path="trip/:id" element={<DriverTripDetail />} />
          <Route path="tracking" element={<DriverTracking />} />
          <Route path="bookings" element={<DriverBookings />} />
          <Route path="earnings" element={<DriverEarnings />} />
          <Route path="notifications" element={<DriverNotifications />} />
          <Route path="profile" element={<DriverProfile />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="routes" element={<AdminRoutes />} />
          <Route path="trips" element={<AdminTrips />} />
          <Route path="drivers" element={<AdminDrivers />} />
          <Route path="drivers/:id" element={<AdminDriverProfile />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="tracking" element={<AdminTracking />} />
          <Route path="cargo" element={<AdminCargo />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
