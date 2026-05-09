import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowLeft, Loader2, CheckCircle2, QrCode } from 'lucide-react';
import api from '../../services/api';
import useAuthStore from '../../store/authStore';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null); // null, 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    setRegistering(true);
    setRegistrationStatus(null);
    try {
      const response = await api.post(`/events/${id}/register`);
      setRegistrationStatus('success');
      setMessage(response.data.msg);
    } catch (error) {
      setRegistrationStatus('error');
      setMessage(error.response?.data?.msg || 'Failed to register');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <Link to="/student/events" className="text-primary hover:underline">Back to events</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link to="/student/events" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>

      <div className="glass rounded-3xl overflow-hidden border border-white/5 relative">
        <div className="h-64 md:h-80 w-full relative">
          {event.banner_image ? (
            <img src={event.banner_image} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              <Calendar className="w-24 h-24 text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-medium mb-4 inline-block backdrop-blur-sm">
              {event.category || 'General'}
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{event.title}</h1>
            <p className="text-gray-300">Organized by {event.organizer_name}</p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10 bg-surface/50 backdrop-blur-xl">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Calendar className="w-4 h-4" />
                </div>
                About Event
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>
            </section>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Date & Time</p>
                  <p className="font-medium text-white">
                    {new Date(event.date_time).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-gray-300">
                    {new Date(event.date_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Venue</p>
                  <p className="font-medium text-white">{event.venue}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Capacity</p>
                  <p className="font-medium text-white">{event.registration_limit ? `${event.registration_limit} Seats` : 'Unlimited'}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                {registrationStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-success/20 border border-success/50 p-4 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-200">Registration Successful!</p>
                      <p className="text-xs text-green-300/80 mt-1">Check your tickets for the QR code.</p>
                      <Link to="/student/tickets" className="mt-3 inline-flex items-center gap-1 text-xs font-medium bg-success/30 px-3 py-1.5 rounded-lg text-white hover:bg-success/40 transition-colors">
                        <QrCode className="w-3 h-3" /> View Ticket
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {registrationStatus === 'error' && (
                      <div className="mb-4 text-xs font-medium text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                        {message}
                      </div>
                    )}
                    <button
                      onClick={handleRegister}
                      disabled={registering || event.status !== 'upcoming'}
                      className="w-full py-3.5 rounded-xl bg-primary hover:bg-primaryDark text-white font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                      {registering ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register Now'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
