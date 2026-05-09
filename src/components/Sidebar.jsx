import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/authStore';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Ticket, 
  User, 
  PlusCircle, 
  Users, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const getLinks = () => {
    switch (user?.role) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
          { name: 'Events', path: '/student/events', icon: CalendarDays },
          { name: 'My Tickets', path: '/student/tickets', icon: Ticket },
          { name: 'Profile', path: '/student/profile', icon: User },
        ];
      case 'organizer':
        return [
          { name: 'Dashboard', path: '/organizer/dashboard', icon: LayoutDashboard },
          { name: 'Create Event', path: '/organizer/create-event', icon: PlusCircle },
          { name: 'Manage Events', path: '/organizer/manage', icon: CalendarDays },
          { name: 'Analytics', path: '/organizer/analytics', icon: BarChart3 },
        ];
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
          { name: 'Manage Users', path: '/admin/users', icon: Users },
          { name: 'Platform Stats', path: '/admin/stats', icon: BarChart3 },
          { name: 'Settings', path: '/admin/settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 glass border-r border-white/5 flex flex-col pt-6 pb-6 px-4">
      <div className="flex items-center gap-2 mb-10 px-2">
        <CalendarDays className="w-8 h-8 text-primary" />
        <span className="text-xl font-display font-bold tracking-wider">
          DIEMS<span className="text-gradient">EVENTS</span>
        </span>
      </div>

      <div className="flex flex-col gap-2 flex-grow">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <Link 
              key={link.path} 
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="sidebar-active" 
                  className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{link.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">{user?.name}</span>
            <span className="text-xs text-gray-400 capitalize">{user?.role}</span>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
