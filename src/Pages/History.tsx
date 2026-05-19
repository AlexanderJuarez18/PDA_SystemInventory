import React, { useState } from 'react';
import { History, Filter, ArrowDownCircle, ArrowUpCircle, RefreshCw, Settings2, User } from 'lucide-react';
import { Layout } from '../Components/Layout';
import { motion } from 'framer-motion';

const MOCK_HISTORY = [
  { id: 1, type: 'inbound', ref: 'REC-9021', items: 12, user: 'Carlos R.', time: 'Hace 5 min' },
  { id: 2, type: 'outbound', ref: 'PICK-4412', items: 8, user: 'Ana G.', time: 'Hace 15 min' },
  { id: 3, type: 'adjustment', ref: 'ADJ-001', items: 5, user: 'Carlos R.', time: 'Hace 30 min' },
  { id: 4, type: 'transfer', ref: 'TRF-001', items: 24, user: 'Roberto S.', time: 'Hace 1 hora' },
  { id: 5, type: 'outbound', ref: 'PICK-4411', items: 15, user: 'Ana G.', time: 'Hace 2 horas' },
  { id: 6, type: 'inbound', ref: 'REC-9020', items: 30, user: 'Juan P.', time: 'Ayer' },
];

export const HistoryPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? MOCK_HISTORY : MOCK_HISTORY.filter(h => h.type === filter);

  return (
    <Layout title="Historial">
      <div className="space-y-4">
        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'inbound', label: 'Entradas' },
            { id: 'outbound', label: 'Salidas' },
            { id: 'adjustment', label: 'Ajustes' },
            { id: 'transfer', label: 'Transferencias' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                filter === f.id ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative pl-8 pb-6"
            >
              {/* Timeline Line */}
              {index < filtered.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-100" />
              )}
              
              {/* Timeline Dot */}
              <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                item.type === 'inbound' ? 'bg-emerald-500' :
                item.type === 'outbound' ? 'bg-blue-500' :
                item.type === 'adjustment' ? 'bg-amber-500' :
                'bg-violet-500'
              }`}>
                {item.type === 'inbound' && <ArrowDownCircle size={14} className="text-white" />}
                {item.type === 'outbound' && <ArrowUpCircle size={14} className="text-white" />}
                {item.type === 'adjustment' && <Settings2 size={12} className="text-white" />}
                {item.type === 'transfer' && <RefreshCw size={12} className="text-white" />}
              </div>

              {/* Content */}
              <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${
                      item.type === 'inbound' ? 'bg-emerald-50 text-emerald-600' :
                      item.type === 'outbound' ? 'bg-blue-50 text-blue-600' :
                      item.type === 'adjustment' ? 'bg-amber-50 text-amber-600' :
                      'bg-violet-50 text-violet-600'
                    }`}>
                      {item.type === 'inbound' ? 'Entrada' :
                       item.type === 'outbound' ? 'Salida' :
                       item.type === 'adjustment' ? 'Ajuste' : 'Transferencia'}
                    </span>
                    <span className="text-xs font-black text-slate-900">{item.ref}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{item.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                    <User size={12} />
                    <span>{item.user}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.items} <span className="text-[10px] font-medium text-slate-400">items</span></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
