import { useEffect, useState } from 'react';
import useAuthStore from '../../store/authStore';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Users, CalendarDays } from 'lucide-react';

const OrganizerDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ events: 0, registrations: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/organizer/events');
        const events = response.data;
        const totalRegs = events.reduce((acc, event) => acc + event.registration_count, 0);
        setStats({ events: events.length, registrations: totalRegs });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold">Organizer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
          <h3 className="text-gray-400 mb-2 flex items-center gap-2"><CalendarDays className="w-4 h-4"/> Total Events</h3>
          <p className="text-4xl font-bold">{stats.events}</p>
        </div>
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
          <h3 className="text-gray-400 mb-2 flex items-center gap-2"><Users className="w-4 h-4"/> Total Registrations</h3>
          <p className="text-4xl font-bold text-primary">{stats.registrations}</p>
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-primary/10 blur-[30px] rounded-full"></div>
        </div>
      </div>
      
      <div className="mt-8">
         <h2 className="text-xl font-bold mb-6">Quick Links</h2>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <Link to="/organizer/create-event" className="glass p-5 rounded-xl border border-white/5 hover:bg-primary/20 transition-all flex items-center justify-between group">
             <span className="font-medium text-sm">Create New Event</span>
             <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors group-hover:translate-x-1" />
           </Link>
           <Link to="/organizer/manage" className="glass p-5 rounded-xl border border-white/5 hover:bg-secondary/20 transition-all flex items-center justify-between group">
             <span className="font-medium text-sm">Manage Events</span>
             <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-secondary transition-colors group-hover:translate-x-1" />
           </Link>
         </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
