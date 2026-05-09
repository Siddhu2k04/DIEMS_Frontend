import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Edit, Trash2, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/organizer/events');
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Manage Events</h1>
          <p className="text-gray-400 mt-1">View and manage your created events.</p>
        </div>
        <Link 
          to="/organizer/create-event"
          className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primaryDark text-white font-medium transition-all shadow-lg flex items-center gap-2 text-sm"
        >
          Create New <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-medium text-gray-400 text-sm">Event Title</th>
                <th className="p-4 font-medium text-gray-400 text-sm">Date</th>
                <th className="p-4 font-medium text-gray-400 text-sm">Status</th>
                <th className="p-4 font-medium text-gray-400 text-sm">Registrations</th>
                <th className="p-4 font-medium text-gray-400 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">
                    You haven't created any events yet.
                  </td>
                </tr>
              ) : (
                events.map((event, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={event.id} 
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4 font-medium text-white">{event.title}</td>
                    <td className="p-4 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {new Date(event.date_time).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'upcoming' ? 'bg-primary/20 text-primary border border-primary/30' : 
                        event.status === 'ongoing' ? 'bg-secondary/20 text-secondary border border-secondary/30' : 
                        'bg-white/10 text-gray-300'
                      }`}>
                        {event.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        {event.registration_count}
                      </div>
                    </td>
                    <td className="p-4 flex justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
