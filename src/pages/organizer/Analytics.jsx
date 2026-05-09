import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Ticket, Star } from 'lucide-react';
import api from '../../services/api';

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

const OrganizerAnalytics = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/organizer/events');
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    fetchEvents();
  }, []);

  const totalRegistrations = events.reduce((acc, ev) => acc + ev.registration_count, 0);
  
  // Mock detailed data
  const registrationTrends = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 19 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 25 },
    { name: 'Fri', count: 32 },
    { name: 'Sat', count: 40 },
    { name: 'Sun', count: 28 },
  ];

  const pieData = events.map(e => ({ name: e.title, value: e.registration_count })).filter(e => e.value > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Event Analytics</h1>
        <p className="text-gray-400 mt-1">Deep dive into your event performance and audience engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Events', val: events.length, icon: Ticket, color: 'primary' },
          { title: 'Total Registrations', val: totalRegistrations, icon: Users, color: 'secondary' },
          { title: 'Avg. Rating', val: '4.8', icon: Star, color: 'accent' },
          { title: 'Conversion Rate', val: '64%', icon: TrendingUp, color: 'green-500' }
        ].map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-6 rounded-2xl border border-white/5"
          >
            <div className={`p-2 w-10 h-10 rounded-lg bg-${stat.color}/10 text-${stat.color} mb-4 flex items-center justify-center`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold mt-1">{stat.val}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-2xl border border-white/5 lg:col-span-2"
        >
          <h3 className="text-lg font-bold mb-6">Weekly Registrations</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '8px' }} />
                <Line type="smooth" dataKey="count" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6 rounded-2xl border border-white/5"
        >
          <h3 className="text-lg font-bold mb-6">Registrations by Event</h3>
          <div className="h-64 w-full">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                No data available
              </div>
            )}
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((entry, idx) => (
              <div key={entry.name} className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                <span className="text-gray-300 truncate">{entry.name}</span>
                <span className="ml-auto font-bold">{entry.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrganizerAnalytics;
