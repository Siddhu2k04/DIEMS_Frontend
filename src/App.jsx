import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyTicket from './pages/VerifyTicket';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentEvents from './pages/student/Events';
import EventDetails from './pages/student/EventDetails';
import Tickets from './pages/student/Tickets';
import Profile from './pages/student/Profile';

// Organizer Pages
import OrganizerDashboard from './pages/organizer/Dashboard';
import CreateEvent from './pages/organizer/CreateEvent';
import ManageEvents from './pages/organizer/ManageEvents';
import OrganizerAnalytics from './pages/organizer/Analytics';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';

function App() {
  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/verify-ticket/:registrationId" element={<VerifyTicket />} />

        {/* Student Routes */}
        <Route element={<DashboardLayout allowedRoles={['student']} />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/events" element={<StudentEvents />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/student/tickets" element={<Tickets />} />
          <Route path="/student/profile" element={<Profile />} />
        </Route>

        {/* Organizer Routes */}
        <Route element={<DashboardLayout allowedRoles={['organizer', 'admin']} />}>
          <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
          <Route path="/organizer/create-event" element={<CreateEvent />} />
          <Route path="/organizer/manage" element={<ManageEvents />} />
          <Route path="/organizer/analytics" element={<OrganizerAnalytics />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<DashboardLayout allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
