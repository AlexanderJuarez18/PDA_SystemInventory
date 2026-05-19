import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Moon, 
  Sun, 
  Database, 
  Smartphone, 
  RefreshCw, 
  Shield, 
  Info,
  ChevronRight,
  LogOut,
  Wifi
} from 'lucide-react';
import { Layout } from '../Components/Layout';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Settings: React.FC = () => {
  const { logout, isOffline, setOffline } = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sections = [
    {
      title: 'Conectividad',
      items: [
        { 
          icon: Wifi, 
          label: 'Modo Offline', 
          value: isOffline ? 'Activado' : 'Desactivado',
          action: () => setOffline(!isOffline),
          toggle: true,
          active: isOffline
        },
        { 
          icon: Database, 
          label: 'Servidor API', 
          value: 'https://api.warehouse.pro',
          action: () => {}
        },
        { 
          icon: RefreshCw, 
          label: 'Sincronización Manual', 
          value: 'Hace 10 min',
          action: () => {}
        },
      ]
    },
    {
      title: 'Preferencias',
      items: [
        { 
          icon: Globe, 
          label: 'Idioma', 
          value: language === 'es' ? 'Español' : 'English',
          action: () => setLanguage(language === 'es' ? 'en' : 'es')
        },
        { 
          icon: darkMode ? Moon : Sun, 
          label: 'Tema Visual', 
          value: darkMode ? 'Oscuro' : 'Claro',
          action: () => setDarkMode(!darkMode),
          toggle: true,
          active: darkMode
        },
      ]
    },
    {
      title: 'Dispositivo',
      items: [
        { 
          icon: Smartphone, 
          label: 'Información PDA', 
          value: 'Honeywell CT40',
          action: () => {}
        },
        { 
          icon: SettingsIcon, 
          label: 'Configuración Escáner', 
          value: 'Láser Activo',
          action: () => {}
        },
      ]
    },
    {
      title: 'Sistema',
      items: [
        { 
          icon: Shield, 
          label: 'Seguridad y Roles', 
          value: 'Administrador',
          action: () => {}
        },
        { 
          icon: Info, 
          label: 'Acerca de', 
          value: 'v1.0.0 (Build 20240518)',
          action: () => {}
        },
      ]
    }
  ];

  return (
    <Layout title="Configuración">
      <div className="space-y-8 pb-12">
        {sections.map((section, i) => (
          <div key={i} className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4">
              {section.title}
            </h3>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              {section.items.map((item, j) => (
                <button
                  key={j}
                  onClick={item.action}
                  className={`w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 active:bg-slate-100`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <item.icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-900">{item.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{item.value}</p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  ) : (
                    <ChevronRight size={18} className="text-slate-300" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleLogout}
          className="w-full bg-rose-50 text-rose-600 py-5 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all border-2 border-rose-100"
        >
          <LogOut size={22} />
          <span>Cerrar Sesión</span>
        </button>

        <div className="text-center space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Industrial Warehouse Pro</p>
          <p className="text-[9px] font-medium text-slate-300 uppercase tracking-widest">© 2026 All Rights Reserved</p>
        </div>
      </div>
    </Layout>
  );
};
