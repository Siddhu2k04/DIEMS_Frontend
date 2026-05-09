import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar as CalendarIcon, Ticket, Star, Sparkles } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import api from '../../services/api';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const [registrations, setRegistrations] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regRes = await api.get('/auth/me/registrations');
        setRegistrations(regRes.data);
        
        const recRes = await api.get('/events/recommendations');
        setRecommendations(recRes.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const upcomingEvents = registrations.filter(
    (r) => new Date(r.event.date_time) > new Date()
  );

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-400 mt-1">Here is what's happening on campus today.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Registered Events */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-primary/50 transition-colors"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wide">Registered Events</h3>
            <Ticket className="w-5 h-5 text-primary" />
          </div>
          <p className="text-4xl font-bold text-white mb-4">
            {registrations.length}
          </p>
          <Link
            to="/student/tickets"
            className="text-xs font-medium text-primary hover:text-white transition-colors flex items-center gap-1"
          >
            View Tickets <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Points */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-accent/50 transition-colors"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all"></div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wide">Points Earned</h3>
            <Star className="w-5 h-5 text-accent" />
          </div>
          <p className="text-4xl font-bold text-white">
            {user?.points || 0}
          </p>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-secondary/50 transition-colors"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all"></div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wide">Upcoming Events</h3>
            <CalendarIcon className="w-5 h-5 text-secondary" />
          </div>
          <p className="text-4xl font-bold text-white mb-4">
            {upcomingEvents.length}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* AI Recommendations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <h2 className="text-xl font-bold">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendations.length > 0 ? recommendations.map((event, idx) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={event.id}
                onClick={() => navigate(`/events/${event.id}`)}
                className="glass rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="h-32 w-full overflow-hidden relative">
                  <img src={event.banner_image || 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2000'} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold text-primary">
                    {event.match_score} Match
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-lg mb-1 truncate">{event.title}</h4>
                  <p className="text-sm text-gray-400">{new Date(event.date_time).toLocaleDateString()}</p>
                </div>
              </motion.div>
            )) : (
              <p className="text-gray-500 text-sm">No recommendations available right now.</p>
            )}
          </div>
        </motion.div>

        {/* Mini Calendar / Agenda */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6 rounded-2xl border border-white/5 h-full"
        >
          <h2 className="text-xl font-bold mb-6">Your Agenda</h2>
          <div className="space-y-4">
            {upcomingEvents.length > 0 ? upcomingEvents.slice(0, 4).map(reg => (
              <div key={reg.id} className="flex gap-4 border-l-2 border-primary pl-4 py-1">
                <div className="flex flex-col items-center justify-center min-w-[3rem]">
                  <span className="text-xs font-bold text-primary uppercase">{new Date(reg.event.date_time).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-xl font-bold leading-none">{new Date(reg.event.date_time).getDate()}</span>
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm truncate">{reg.event.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{new Date(reg.event.date_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </div>
            )) : (
              <div className="text-center py-10">
                <CalendarIcon className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No upcoming events.</p>
                <Link to="/student/events" className="text-primary text-sm hover:underline mt-2 inline-block">Browse Events</Link>
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default StudentDashboard;