import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Zap, Shield, ArrowRight, Play } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-accent/20 blur-[120px] rounded-full animate-blob" style={{ animationDelay: '4s' }}></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-ping"></span>
            <span className="text-sm font-medium text-gray-300">The Next Generation Platform</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8"
          >
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-premium-gradient">College Events</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Streamline communication, automate registrations, and deliver unforgettable experiences with our AI-powered event management platform.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/signup" 
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-primaryDark text-white font-medium transition-all shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/events" 
              className="w-full sm:w-auto px-8 py-4 rounded-full glass hover:bg-white/10 text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 text-gray-300" /> Explore Events
            </Link>
          </motion.div>
        </div>

        {/* Floating App Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-5xl mx-auto mt-20 relative animate-float"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <div className="glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
            <div className="h-8 bg-black/40 border-b border-white/10 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="h-[400px] bg-surface p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
                <div className="text-center z-10">
                  <h3 className="text-2xl font-bold mb-4">Live Dashboard Preview</h3>
                  <div className="grid grid-cols-3 gap-4 opacity-70">
                    <div className="h-32 w-48 bg-white/5 rounded-xl border border-white/10"></div>
                    <div className="h-32 w-48 bg-white/5 rounded-xl border border-white/10"></div>
                    <div className="h-32 w-48 bg-white/5 rounded-xl border border-white/10"></div>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative z-10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Everything you need to succeed</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">A complete toolkit designed for students, organizers, and administrators.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Real-time Updates', desc: 'Instant notifications for schedule changes, announcements, and new events.', color: 'text-primary' },
              { icon: Users, title: 'Seamless Registration', desc: 'One-click registration with automated QR code ticket generation.', color: 'text-secondary' },
              { icon: Shield, title: 'Role-based Access', desc: 'Dedicated dashboards for students, organizers, and college admins.', color: 'text-accent' },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
