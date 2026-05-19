import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Scan, 
  Package, 
  BarChart2, 
  Bell, 
  Settings, 
  Menu,
  X,
  LogOut,
  Wifi,
  WifiOff,
  Battery,
  User
} from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, showNav = true }) => {
  const { user, logout, isOffline } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: Scan, label: 'Escáner', path: '/scanner' },
    { icon: Package, label: 'Inventario', path: '/inventory' },
    { icon: BarChart2, label: 'Reportes', path: '/reports' },
    { icon: Bell, label: 'Notificaciones', path: '/notifications' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Status Bar */}
      <div className="bg-slate-900 text-white px-4 py-1 flex justify-between items-center text-[10px] font-medium uppercase tracking-wider">
        <div className="flex items-center gap-2">
          {isOffline ? <WifiOff size={12} className="text-red-400" /> : <Wifi size={12} className="text-green-400" />}
          <span>{isOffline ? 'Offline' : 'Online'}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Battery size={12} className="text-green-400" />
            <span>85%</span>
          </div>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          {showNav && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors active:scale-95"
            >
              <Menu size={24} />
            </button>
          )}
          <h1 className="text-lg font-bold truncate max-w-[200px]">
            {title || 'Warehouse Pro'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-2 rounded-full">
            <User size={20} className="text-slate-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 pb-24"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile PDA style) */}
      {showNav && (
        <nav className="bg-white border-t border-slate-200 flex justify-around items-center py-2 px-1 fixed bottom-0 left-0 right-0 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-10">
          {navItems.slice(0, 4).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-xl transition-all active:scale-90",
                  isActive ? "text-blue-600 bg-blue-50" : "text-slate-500"
                )}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-bold uppercase">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                <div>
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Operador Activo</p>
                  <h2 className="text-xl font-bold">{user?.name || 'Usuario'}</h2>
                  <p className="text-xs text-slate-400">{user?.role.toUpperCase()} • ID: {user?.employeeId}</p>
                </div>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path);
                        setIsSidebarOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 px-6 py-4 transition-colors",
                        isActive ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <item.icon size={22} />
                      <span className="font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-6 py-4 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-bold"
                >
                  <LogOut size={22} />
                  <span>Cerrar Sesión</span>
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-4 font-medium">
                  v1.0.0 • Industrial Warehouse Pro
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
