import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import useAuthStore from '../../store/authStore';
import api from '../../services/api';
import { Users, Calendar as CalendarIcon, Ticket, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ total_users: 0, total_events: 0, total_registrations: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Failed to load stats", error);
      }
    };
    fetchStats();
  }, []);

  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', users: 400, events: 24, registrations: 2400 },
    { name: 'Feb', users: 300, events: 13, registrations: 1398 },
    { name: 'Mar', users: 200, events: 98, registrations: 9800 },
    { name: 'Apr', users: 278, events: 39, registrations: 3908 },
    { name: 'May', users: 189, events: 48, registrations: 4800 },
    { name: 'Jun', users: 239, events: 38, registrations: 3800 },
    { name: 'Jul', users: 349, events: 43, registrations: 4300 },
  ];

  const statCards = [
    { title: "Total Users", value: stats.total_users, icon: Users, color: "primary" },
    { title: "Total Events", value: stats.total_events, icon: CalendarIcon, color: "secondary" },
    { title: "Total Registrations", value: stats.total_registrations, icon: Ticket, color: "accent" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Platform overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}/10 rounded-full blur-3xl group-hover:bg-${stat.color}/20 transition-all`}></div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-gray-400 font-medium tracking-wide text-sm uppercase">{stat.title}</h3>
              <div className={`p-2 rounded-lg bg-${stat.color}/10 text-${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-white">{stat.value}</p>
              <div className="flex items-center text-green-400 text-sm mb-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-2xl border border-white/5"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-accent" />
            Registration Trends
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="registrations" stroke="#f59e0b" fillOpacity={1} fill="url(#colorReg)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Users & Events Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-2xl border border-white/5"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Platform Growth
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '8px' }}
                  cursor={{fill: '#ffffff05'}}
                />
                <Bar dataKey="users" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="events" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
