import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import useAuthStore from '../store/authStore';

const NotificationToast = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // Connect to Socket.IO server
    const socketUrl = import.meta.env.VITE_API_URL 
      ? import.meta.env.VITE_API_URL.replace('/api', '') 
      : 'http://localhost:5000';
      
    const socket = io(socketUrl, {
      transports: ['websocket', 'polling']
    });

    socket.on('connect', () => {
      // Join personal notification room
      socket.emit('join', { room: `user_${user.id}` });
    });

    socket.on('notification', (data) => {
      const newNotification = {
        id: Date.now(),
        message: data.message,
        type: data.type
      };
      
      setNotifications(prev => [newNotification, ...prev]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, isAuthenticated]);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="glass bg-surface/80 p-4 rounded-xl border border-white/10 shadow-2xl flex items-start gap-3 w-80 backdrop-blur-xl"
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              notif.type === 'success' ? 'bg-success/20 text-success' : 
              notif.type === 'error' ? 'bg-danger/20 text-danger' : 
              'bg-primary/20 text-primary'
            }`}>
              <Bell className="w-4 h-4" />
            </div>
            
            <div className="flex-1 pr-4">
              <p className="text-sm font-medium text-white">{notif.message}</p>
            </div>

            <button 
              onClick={() => removeNotification(notif.id)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
