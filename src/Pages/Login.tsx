import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  User, 
  QrCode, 
  ChevronRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import useAuthStore, { UserRole } from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

type LoginMethod = 'password' | 'pin' | 'qr';

export const Login: React.FC = () => {
  const [method, setMethod] = useState<LoginMethod>('password');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (method === 'password' && username === 'admin' && password === 'admin') {
        login({
          id: '1',
          name: 'Carlos Rodríguez',
          role: 'admin',
          employeeId: 'EMP-001'
        });
        navigate('/');
      } else if (method === 'pin' && pin === '1234') {
        login({
          id: '2',
          name: 'Ana García',
          role: 'operator',
          employeeId: 'EMP-042'
        });
        navigate('/');
      } else if (method === 'qr') {
        // Mock QR scan success
        login({
          id: '3',
          name: 'Roberto Sánchez',
          role: 'supervisor',
          employeeId: 'EMP-015'
        });
        navigate('/');
      } else {
        setError('Credenciales incorrectas. Intente de nuevo.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const renderMethodSelector = () => (
    <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-2xl">
      {(['password', 'pin', 'qr'] as LoginMethod[]).map((m) => (
        <button
          key={m}
          onClick={() => {
            setMethod(m);
            setError('');
          }}
          className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase transition-all ${
            method === m 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {m === 'password' && 'Clave'}
          {m === 'pin' && 'PIN'}
          {m === 'qr' && 'QR'}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col p-6 text-white">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
            <Package size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">WAREHOUSE PRO</h1>
          <p className="text-slate-400 font-medium">Sistema de Gestión Logística v1.0</p>
        </motion.div>

        <div className="bg-white rounded-[2.5rem] p-8 text-slate-900 shadow-2xl">
          {renderMethodSelector()}

          <AnimatePresence mode="wait">
            {method === 'password' && (
              <motion.form 
                key="password"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Usuario</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </motion.form>
            )}

            {method === 'pin' && (
              <motion.div 
                key="pin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div 
                      key={i}
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        pin.length > i ? 'bg-blue-600 border-blue-600 scale-125' : 'bg-slate-100 border-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'OK'].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        if (val === 'C') setPin('');
                        else if (val === 'OK') handleLogin();
                        else if (pin.length < 4) setPin(prev => prev + val);
                      }}
                      className={`h-16 rounded-2xl font-black text-xl flex items-center justify-center active:scale-90 transition-all ${
                        val === 'OK' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {method === 'qr' && (
              <motion.div 
                key="qr"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center space-y-6 py-4"
              >
                <div className="w-48 h-48 bg-slate-100 rounded-3xl mx-auto flex items-center justify-center border-4 border-dashed border-slate-200 relative overflow-hidden group cursor-pointer" onClick={handleLogin}>
                  <QrCode size={80} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-blue-600 font-bold text-xs uppercase">Escanear Gafete</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 font-medium">Escanee su código QR de empleado para acceso rápido</p>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold"
            >
              <AlertCircle size={20} />
              <span>{error}</span>
            </motion.div>
          )}

          {method === 'password' && (
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full mt-8 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-slate-900/20"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Ingresar</span>
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          )}

          <div className="mt-8 text-center">
            <button className="text-xs font-bold text-slate-400 uppercase hover:text-blue-600 transition-colors">
              ¿Olvidó su contraseña?
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mt-8">
        © 2026 Industrial Solutions Group
      </p>
    </div>
  );
};

// Helper component for the logo
const Package = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);