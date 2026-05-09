import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import NotificationToast from '../components/NotificationToast';
import useAuthStore from '../store/authStore';

const DashboardLayout = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-white flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen bg-[#0f0f13]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <NotificationToast />
    </div>
  );
};

export default DashboardLayout;
