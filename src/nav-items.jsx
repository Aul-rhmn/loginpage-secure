import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return !user ? children : <Navigate to="/dashboard" />;
};

export const navItems = [
  {
    to: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    to: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    to: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    to: "/dashboard/*",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
  },
];