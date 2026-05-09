import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Loader2, Mail, MapPin, User, XCircle } from 'lucide-react';
import api from '../services/api';

const VerifyTicket = () => {
  const { registrationId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await api.get(`/events/registrations/${registrationId}/verify`);
        setTicket(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Ticket not found');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [registrationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="glass max-w-md w-full rounded-2xl border border-danger/30 p-8 text-center">
          <XCircle className="w-12 h-12 text-danger mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Invalid Ticket</h1>
          <p className="text-gray-400">{error}</p>
          <Link to="/" className="inline-flex mt-6 text-sm text-primary hover:underline">Back to home</Link>
        </div>
      </div>
    );
  }

  const eventDate = new Date(ticket.event.date_time).toLocaleString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="glass max-w-2xl w-full rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <CheckCircle2 className="w-7 h-7 text-success" />
          <div>
            <h1 className="text-2xl font-bold text-white">Verified Ticket</h1>
            <p className="text-sm text-gray-400">Registration ID: {ticket.id.toString().padStart(6, '0')}</p>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="rounded-xl bg-white/5 border border-white/10 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Student Details</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-white font-medium">{ticket.student.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-white break-all">{ticket.student.email}</p>
                </div>
              </div>
              {ticket.student.department && (
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-white">{ticket.student.department}</p>
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl bg-white/5 border border-white/10 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">Event Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Event</p>
                <p className="text-white font-medium">{ticket.event.title}</p>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="text-white">{eventDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Venue</p>
                  <p className="text-white">{ticket.event.venue}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Organizer</p>
                <p className="text-white">{ticket.event.organizer_name}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VerifyTicket;
