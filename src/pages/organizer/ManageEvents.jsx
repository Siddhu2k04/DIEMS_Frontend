import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Edit, Trash2, Loader2, ArrowRight, X, Save, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    venue: '',
    date_time: '',
    category: '',
    registration_limit: '',
    banner_image: '',
    status: 'upcoming'
  });

  const fetchEvents = async () => {
    try {
      const response = await api.get('/organizer/events');
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events", error);
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toDateTimeLocal = (dateTime) => {
    const date = new Date(dateTime);
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  };

  const handleEditClick = async (eventId) => {
    setError('');
    setActionLoading(true);
    try {
      const response = await api.get(`/events/${eventId}`);
      const event = response.data;
      setEditingEvent(event);
      setEditForm({
        title: event.title || '',
        description: event.description || '',
        venue: event.venue || '',
        date_time: toDateTimeLocal(event.date_time),
        category: event.category || '',
        registration_limit: event.registration_limit || '',
        banner_image: event.banner_image || '',
        status: event.status || 'upcoming'
      });
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to load event details');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setActionLoading(true);
    try {
      const payload = {
        ...editForm,
        date_time: new Date(editForm.date_time).toISOString(),
        registration_limit: editForm.registration_limit ? parseInt(editForm.registration_limit) : null
      };
      await api.put(`/events/${editingEvent.id}`, payload);
      setEditingEvent(null);
      await fetchEvents();
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to update event');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (event) => {
    const confirmed = window.confirm(`Delete "${event.title}"? This also removes its registrations.`);
    if (!confirmed) return;

    setError('');
    setActionLoading(true);
    try {
      await api.delete(`/events/${event.id}`);
      setEvents((currentEvents) => currentEvents.filter((item) => item.id !== event.id));
    } catch (error) {
      setError(error.response?.data?.msg || 'Failed to delete event');
    } finally {
      setActionLoading(false);
    }
  };

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

      {error && (
        <div className="bg-danger/20 border border-danger/50 text-red-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

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
                      <button
                        type="button"
                        onClick={() => handleEditClick(event.id)}
                        disabled={actionLoading}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
                        aria-label={`Edit ${event.title}`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(event)}
                        disabled={actionLoading}
                        className="p-2 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger transition-colors disabled:opacity-50"
                        aria-label={`Delete ${event.title}`}
                      >
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

      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Edit Event</h2>
                <p className="text-sm text-gray-400 mt-1">Update event details and status.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close edit event"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Event Title</label>
                  <input name="title" value={editForm.title} onChange={handleEditChange} required className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Description</label>
                  <textarea name="description" value={editForm.description} onChange={handleEditChange} required rows="4" className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</label>
                  <input type="datetime-local" name="date_time" value={editForm.date_time} onChange={handleEditChange} required className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary [color-scheme:dark]" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Venue</label>
                  <input name="venue" value={editForm.venue} onChange={handleEditChange} required className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Category</label>
                  <input name="category" value={editForm.category} onChange={handleEditChange} className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Capacity</label>
                  <input type="number" min="1" name="registration_limit" value={editForm.registration_limit} onChange={handleEditChange} className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Status</label>
                  <select name="status" value={editForm.status} onChange={handleEditChange} className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                    <option className="bg-surface" value="upcoming">Upcoming</option>
                    <option className="bg-surface" value="ongoing">Ongoing</option>
                    <option className="bg-surface" value="completed">Completed</option>
                    <option className="bg-surface" value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Banner Image URL</label>
                  <input type="url" name="banner_image" value={editForm.banner_image} onChange={handleEditChange} className="block w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 flex justify-end gap-3">
                <button type="button" onClick={() => setEditingEvent(null)} className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading} className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primaryDark text-white font-medium transition-colors disabled:opacity-50 flex items-center gap-2">
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Event
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
