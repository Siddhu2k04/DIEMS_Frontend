import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Zap, Shield, ArrowRight, Play, Ticket, Bell, BarChart3, QrCode, CheckCircle2, Sparkles } from 'lucide-react';
import useAuthStore from '../store/authStore';

const getDashboardPath = (user) => {
  if (user?.role === 'admin') return '/admin/dashboard';
  if (user?.role === 'organizer') return '/organizer/dashboard';
  return '/student/dashboard';
};

const LandingPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const primaryPath = isAuthenticated ? getDashboardPath(user) : '/signup';
  const explorePath = isAuthenticated && user?.role === 'student' ? '/student/events' : primaryPath;

  const features = [
    { icon: Bell, title: 'Real-time Updates', desc: 'Send event announcements, schedule changes, and reminders instantly.', color: 'text-primary' },
    { icon: Ticket, title: 'Easy Registration', desc: 'Students can register in one click and receive QR-based tickets.', color: 'text-secondary' },
    { icon: Shield, title: 'Role Access', desc: 'Dedicated experiences for students, organizers, and administrators.', color: 'text-accent' },
  ];

  const steps = [
    { title: 'Create', desc: 'Organizers publish events with date, venue, category, and seat limits.' },
    { title: 'Register', desc: 'Students discover events and generate secure QR tickets.' },
    { title: 'Verify', desc: 'QR scans show readable student and event details for check-in.' },
  ];

  return (
    <div id="home" className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-24 pb-16 lg:pt-32 lg:pb-24 min-h-[calc(100vh-80px)] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=80"
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/85 to-background"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center relative z-10">
          <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-gray-300">DIEMS college event platform</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8"
          >
            Run college events without the chaos.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10"
          >
            DIEMS Events brings discovery, registrations, QR tickets, organizer tools, and admin oversight into one fast dashboard.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to={primaryPath}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-primary hover:bg-primaryDark text-white font-medium transition-all shadow-[0_0_30px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2"
            >
              {isAuthenticated ? 'Open Dashboard' : 'Get Started Free'} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to={explorePath}
              className="w-full sm:w-auto px-8 py-4 rounded-lg glass hover:bg-white/10 text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 text-gray-300" /> Explore Events
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="grid grid-cols-3 gap-4 mt-12 max-w-xl"
          >
            {[
              ['QR', 'Ticketing'],
              ['3', 'User roles'],
              ['Live', 'Updates'],
            ].map(([value, label]) => (
              <div key={label} className="glass rounded-lg border border-white/10 p-4">
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="glass rounded-lg border border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="h-10 bg-black/40 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-500 ml-3">DIEMS dashboard</span>
            </div>
            <div className="bg-[#101014] p-5 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Today</p>
                  <h3 className="text-2xl font-bold">Event Command Center</h3>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-success/20 text-success text-xs font-medium">Live</div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Calendar, label: 'Events', value: '12' },
                  { icon: Users, label: 'Students', value: '840' },
                  { icon: QrCode, label: 'Tickets', value: '316' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-white/5 border border-white/10 p-4">
                    <item.icon className="w-5 h-5 text-primary mb-3" />
                    <p className="text-xl font-bold">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-white/5 border border-white/10 p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium">Upcoming registrations</p>
                  <BarChart3 className="w-4 h-4 text-gray-500" />
                </div>
                <div className="space-y-3">
                  {['Hackathon', 'AI Workshop', 'Cultural Night'].map((event, index) => (
                    <div key={event} className="flex items-center gap-3">
                      <div className="w-24 text-xs text-gray-400">{event}</div>
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${90 - index * 18}%` }}
                          transition={{ duration: 1, delay: 0.6 + index * 0.15 }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="events" className="py-24 px-6 relative z-10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Everything events need to succeed</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A complete toolkit designed for students, organizers, and administrators.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-lg border border-white/5 hover:border-white/20 transition-all group"
              >
                <div className={`w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm uppercase tracking-wider text-primary font-semibold mb-3">How it works</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">From announcement to check-in.</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              DIEMS Events keeps the workflow simple: organizers create events, students register, and teams verify attendance with QR tickets.
            </p>
          </motion.div>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-lg border border-white/10 p-5 flex gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{step.title}</h3>
                  <p className="text-gray-400 mt-1">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto glass rounded-lg border border-white/10 p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div>
            <h2 className="text-3xl font-display font-bold mb-3">Ready to manage your next event?</h2>
            <p className="text-gray-400 max-w-2xl">Start with a student account or open your dashboard to continue managing registrations.</p>
          </div>
          <Link
            to={primaryPath}
            className="px-7 py-3 rounded-lg bg-primary hover:bg-primaryDark text-white font-medium transition-colors inline-flex items-center justify-center gap-2 shrink-0"
          >
            Continue <CheckCircle2 className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
