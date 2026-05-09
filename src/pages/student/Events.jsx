import { useState, useEffect } from 'react';
import api from '../../services/api';
import EventCard from '../../components/EventCard';
import { Search, Filter, Loader2 } from 'lucide-react';

const StudentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events/');
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = ['All', ...new Set(events.map(e => e.category).filter(Boolean))];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Discover Events</h1>
          <p className="text-gray-400 mt-1">Find and register for the latest college events.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 glass rounded-xl border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm w-full sm:w-64"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-9 pr-8 py-2 glass rounded-xl border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-surface text-white">{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="glass p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">No events found</h3>
          <p className="text-gray-400 max-w-md mx-auto">We couldn't find any events matching your current filters. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentEvents;
