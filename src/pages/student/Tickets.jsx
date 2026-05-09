import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Ticket as TicketIcon, Calendar, MapPin, Loader2, QrCode, X } from 'lucide-react';
import api from '../../services/api';

const Tickets = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getQrCodeUrl = (qrCode) => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    return `${apiBaseUrl.replace('/api', '')}${qrCode}`;
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/auth/me/registrations');
        setRegistrations(response.data);
      } catch (error) {
        console.error("Failed to fetch tickets", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
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
      <div>
        <h1 className="text-3xl font-display font-bold">My Tickets</h1>
        <p className="text-gray-400 mt-1">View your event registrations and QR codes.</p>
      </div>

      {registrations.length === 0 ? (
        <div className="glass p-12 rounded-2xl border border-white/5 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <TicketIcon className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">No tickets yet</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">You haven't registered for any events yet. Discover upcoming events to join!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registrations.map((reg, index) => (
            <motion.div 
              key={reg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl border border-white/5 overflow-hidden flex flex-col sm:flex-row relative group"
            >
              {/* Event Image Banner for Mobile / Left side for Desktop */}
              <div className="sm:w-1/3 h-32 sm:h-auto relative bg-white/5 shrink-0">
                 {reg.event.banner_image ? (
                  <img src={reg.event.banner_image} alt={reg.event.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Calendar className="w-8 h-8 text-white/30" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase backdrop-blur-md ${
                    reg.status === 'approved' ? 'bg-success/80 text-white' : 
                    reg.status === 'pending' ? 'bg-warning/80 text-white' : 
                    'bg-danger/80 text-white'
                  }`}>
                    {reg.status}
                  </span>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="p-5 flex-1 flex flex-col relative border-l border-white/10 border-dashed">
                {/* Dashed cut-out effect */}
                <div className="absolute -left-3 top-[-10px] w-6 h-6 bg-[#0f0f13] rounded-full"></div>
                <div className="absolute -left-3 bottom-[-10px] w-6 h-6 bg-[#0f0f13] rounded-full"></div>
                
                <h3 className="text-lg font-bold mb-1 line-clamp-1 pr-12">{reg.event.title}</h3>
                
                <div className="space-y-2 mt-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{new Date(reg.event.date_time).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span className="truncate">{reg.event.venue}</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">ID: {reg.id.toString().padStart(6, '0')}</span>
                  
                  {reg.qr_code && (
                    <button
                      type="button"
                      onClick={() => setSelectedTicket(reg)}
                      className="flex items-center gap-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" /> Show QR
                    </button>
                  )}
                </div>
                
                {/* QR Code preview floating */}
                {reg.qr_code && (
                   <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-lg p-1 shadow-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <img src={getQrCodeUrl(reg.qr_code)} alt="QR Code" className="w-full h-full object-contain" />
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass w-full max-w-sm rounded-2xl border border-white/10 p-6 relative text-center"
          >
            <button
              type="button"
              onClick={() => setSelectedTicket(null)}
              className="absolute right-4 top-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close QR code"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mx-auto mb-5 w-56 h-56 bg-white rounded-xl p-3 shadow-xl">
              <img
                src={getQrCodeUrl(selectedTicket.qr_code)}
                alt={`${selectedTicket.event.title} QR Code`}
                className="w-full h-full object-contain"
              />
            </div>

          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Tickets;
