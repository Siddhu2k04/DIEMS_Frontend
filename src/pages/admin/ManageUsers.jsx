import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, ShieldAlert, User, Loader2, Search } from 'lucide-react';
import api from '../../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Failed to update role", error);
      alert("Failed to update user role");
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">User Management</h1>
          <p className="text-gray-400 mt-1">Manage platform users and assign administrative roles.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 glass rounded-xl border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm w-full sm:w-64"
          />
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 font-medium text-gray-400 text-sm">User Details</th>
                <th className="p-4 font-medium text-gray-400 text-sm">Joined Date</th>
                <th className="p-4 font-medium text-gray-400 text-sm">Current Role</th>
                <th className="p-4 font-medium text-gray-400 text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-400">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={user.id} 
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-300">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.role === 'admin' ? <ShieldAlert className="w-4 h-4 text-danger" /> : 
                         user.role === 'organizer' ? <Shield className="w-4 h-4 text-secondary" /> : 
                         <User className="w-4 h-4 text-primary" />}
                        <span className={`text-sm font-medium capitalize ${
                          user.role === 'admin' ? 'text-danger' : 
                          user.role === 'organizer' ? 'text-secondary' : 
                          'text-primary'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="px-3 py-1.5 glass rounded-lg border border-white/10 focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer bg-surface/50 text-white"
                      >
                        <option value="student">Make Student</option>
                        <option value="organizer">Make Organizer</option>
                        <option value="admin">Make Admin</option>
                      </select>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
