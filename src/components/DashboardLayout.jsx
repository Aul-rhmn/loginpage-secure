import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Menu as MenuIcon,
} from 'lucide-react';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { name: 'Users', to: '/dashboard/users', icon: Users },
    { name: 'Audit Logs', to: '/dashboard/audit-logs', icon: FileText },
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Sidebar */}
      <div
        className={`position-fixed h-100 start-0 top-0 bg-white shadow ${
          sidebarOpen ? 'translate-middle-x-0' : 'translate-middle-x-100'
        } d-lg-block`}
        style={{ width: '250px', zIndex: 1000, transition: 'transform 0.3s ease-in-out' }}
      >
        <div className="d-flex flex-column h-100">
          <div className="d-flex align-items-center justify-content-center p-3 border-bottom">
            <h1 className="h4 mb-0">Admin Dashboard</h1>
          </div>
          <nav className="flex-grow-1 p-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`d-flex align-items-center text-decoration-none p-2 rounded mb-2 ${
                    location.pathname === item.to
                      ? 'bg-light text-dark'
                      : 'text-secondary'
                  }`}
                >
                  <Icon className="me-2" size={20} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 border-top">
            <button
              className="btn btn-link text-decoration-none w-100 text-start"
              onClick={logout}
            >
              <LogOut className="me-2" size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="ms-lg-5" style={{ marginLeft: '250px' }}>
        <div className="sticky-top bg-white shadow-sm">
          <div className="d-flex align-items-center p-3">
            <button
              className="btn btn-link d-lg-none"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon size={24} />
            </button>
            <div className="ms-auto">
              <span className="text-muted">Welcome, {user?.name}</span>
            </div>
          </div>
        </div>
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;