import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Package, 
  Trash2, 
  FileText, 
  RefreshCw, 
  ClipboardList, 
  MoveHorizontal,
  Settings2,
  History,
  AlertTriangle
} from 'lucide-react';
import { Layout } from '../Components/Layout';
import { motion } from 'framer-motion';

const modules = [
  { id: 'inbound', label: 'Entradas', icon: ArrowDownCircle, color: 'bg-emerald-500', path: '/orders/inbound' },
  { id: 'outbound', label: 'Salidas', icon: ArrowUpCircle, color: 'bg-blue-500', path: '/orders/outbound' },
  { id: 'inventory', label: 'Inventario', icon: Package, color: 'bg-amber-500', path: '/inventory' },
  { id: 'merma', label: 'Merma', icon: Trash2, color: 'bg-rose-500', path: '/merma' },
  { id: 'requests', label: 'Solicitudes', icon: FileText, color: 'bg-indigo-500', path: '/requests' },
  { id: 'cyclic', label: 'Conteo Cíclico', icon: RefreshCw, color: 'bg-cyan-500', path: '/inventory/cyclic' },
  { id: 'transfers', label: 'Transferencias', icon: MoveHorizontal, color: 'bg-violet-500', path: '/transfers' },
  { id: 'adjustments', label: 'Ajustes', icon: Settings2, color: 'bg-slate-500', path: '/adjustments' },
  { id: 'history', label: 'Historial', icon: History, color: 'bg-slate-700', path: '/history' },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Dashboard Operativo">
      <div className="space-y-6">
        {/* Quick Stats / Alerts */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Pendientes</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-black text-slate-900">12</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Órdenes</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Alertas</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-black text-rose-600">3</span>
              <AlertTriangle size={16} className="text-rose-500 mb-1" />
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-3 gap-3">
          {modules.map((mod, index) => (
            <motion.button
              key={mod.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(mod.path)}
              className="flex flex-col items-center justify-center aspect-square bg-white rounded-[2rem] border border-slate-100 shadow-sm active:scale-90 active:bg-slate-50 transition-all group"
            >
              <div className={`w-12 h-12 ${mod.color} rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-${mod.color.split('-')[1]}-500/20 group-active:scale-110 transition-transform`}>
                <mod.icon size={24} className="text-white" />
              </div>
              <span className="text-[10px] font-black text-slate-700 uppercase text-center px-2 leading-tight">
                {mod.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black uppercase tracking-widest">Actividad Reciente</h3>
            <button className="text-[10px] font-bold text-blue-400 uppercase">Ver Todo</button>
          </div>
          <div className="space-y-4">
            {[
              { type: 'Entrada', id: 'REC-9021', time: 'Hace 5 min', status: 'Completado' },
              { type: 'Salida', id: 'PICK-4412', time: 'Hace 12 min', status: 'En Proceso' },
              { type: 'Ajuste', id: 'ADJ-0012', time: 'Hace 45 min', status: 'Pendiente' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.type === 'Entrada' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {item.type === 'Entrada' ? <ArrowDownCircle size={16} /> : <ArrowUpCircle size={16} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{item.id}</p>
                    <p className="text-[10px] text-slate-400">{item.type} • {item.time}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                  item.status === 'Completado' ? 'bg-emerald-500/20 text-emerald-400' : 
                  item.status === 'En Proceso' ? 'bg-blue-500/20 text-blue-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
