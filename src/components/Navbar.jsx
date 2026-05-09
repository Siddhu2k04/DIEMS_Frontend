import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import { Calendar } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Calendar className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl font-display font-bold tracking-wider"
          >
            DIEMS<span className="text-gradient">EVENTS</span>
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/events" className="hover:text-white transition-colors">Events</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link 
                to={user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'organizer' ? '/organizer/dashboard' : '/student/dashboard'} 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <button 
                onClick={logout}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-5 py-2 rounded-full bg-primary hover:bg-primaryDark text-white transition-colors text-sm font-medium shadow-[0_0_15px_rgba(99,102,241,0.5)]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
