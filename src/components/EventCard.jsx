import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const isUpcoming = new Date(event.date_time) > new Date();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl border border-white/5 overflow-hidden group hover:border-primary/50 transition-colors flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-white/5">
        {event.banner_image ? (
          <img 
            src={event.banner_image} 
            alt={event.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-105 transition-transform duration-500">
            <Calendar className="w-12 h-12 text-white/30" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
            event.status === 'upcoming' ? 'bg-primary/80 text-white' : 
            event.status === 'ongoing' ? 'bg-secondary/80 text-white' : 
            'bg-white/20 text-gray-300'
          }`}>
            {event.status.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-sm text-primary font-medium">
          <span className="px-2 py-1 bg-primary/10 rounded-md">{event.category || 'General'}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-2">{event.description}</p>
        
        <div className="mt-auto space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{new Date(event.date_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        <Link 
          to={`/events/${event.id}`} 
          className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-primary hover:text-white transition-all font-medium border border-white/10 group-hover:border-primary/50"
        >
          View Details <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
