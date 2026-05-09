import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, Award, Loader2, Save, CheckCircle2, Image, X } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import api from '../../services/api';

const Profile = () => {
  const { user, checkAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    profile_picture: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        department: user.department || '',
        profile_picture: user.profile_picture || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await api.put('/auth/me', formData);
      await checkAuth(); // Refresh user data in store
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold">My Profile</h1>
        <p className="text-gray-400 mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl border border-white/5 p-6 flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary/30 to-secondary/30"></div>
            
            <div className="w-24 h-24 rounded-full bg-surface border-4 border-background flex items-center justify-center text-4xl font-bold text-transparent bg-clip-text bg-premium-gradient z-10 mt-6 shadow-xl overflow-hidden">
              {user?.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt={user?.name || 'Profile'}
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>
            
            <h2 className="text-xl font-bold mt-4 z-10">{user?.name}</h2>
            <p className="text-sm text-gray-400 mb-6 z-10 capitalize">{user?.role}</p>

            <div className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex flex-col items-center">
                <Award className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-gray-400">Points</span>
                <span className="font-bold">{user?.points || 0}</span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col items-center">
                <Award className="w-5 h-5 text-secondary mb-1" />
                <span className="text-xs text-gray-400">Badges</span>
                <span className="font-bold">{user?.badges?.length || 0}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl border border-white/5 p-8"
          >
            <h3 className="text-lg font-bold mb-6">Personal Information</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="email" 
                    value={user?.email || ''}
                    disabled
                    className="block w-full pl-10 pr-3 py-3 border border-white/5 rounded-xl bg-white/5 text-gray-400 cursor-not-allowed sm:text-sm"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Profile Photo URL</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {formData.profile_picture ? (
                      <img
                        src={formData.profile_picture}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image className="h-7 w-7 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Image className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="url"
                        name="profile_picture"
                        value={formData.profile_picture}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    {formData.profile_picture && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, profile_picture: '' })}
                        className="inline-flex items-center gap-1.5 text-xs text-red-300 hover:text-red-200 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" /> Remove photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300 uppercase tracking-wider">Department</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-500" />
                  </div>
                  <input 
                    type="text" 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="e.g. Computer Science"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <div>
                  {success && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-success flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Profile updated
                    </motion.span>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primaryDark text-white font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
