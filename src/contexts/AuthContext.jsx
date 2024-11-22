import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';
import { api } from '@/lib/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const data = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(jwtDecode(data.token));
      navigate('/dashboard');
      toast.success('Successfully logged in');
    } catch (error) {
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      await api.post('/auth/register', userData);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to register');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
    toast.success('Successfully logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};