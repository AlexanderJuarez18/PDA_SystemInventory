import React, { useState } from 'react';
import { FileText, Plus, Check, X, Clock, ChevronRight, User } from 'lucide-react';
import { Layout } from '../Components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_REQUESTS = [
  { id: 'SOL-001', title: 'Solicitud de Herramientas', requester: 'Juan Pérez', priority: 'alta', status: 'pending', date: '18 May' },
  { id: 'SOL-002', title: 'Materiales de Empaque', requester: 'María García', priority: 'media', status: 'approved', date: '17 May' },
  { id: 'SOL-003', title: 'Equipos de Seguridad', requester: 'Carlos López', priority: 'baja', status: 'rejected', date: '16 May' },
];

export const Requests: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <Layout title="Solicitudes">
      <AnimatePresence mode="wait">
        {showCreate ? (
          <motion.div
            key="create"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-lg font-black text-slate-900">Nueva Solicitud</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Título</label>
                <input
                  type="text"
                  placeholder="Descripción de la solicitud..."
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 px-4 focus:border-blue-500 outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Prioridad</label>
                <div className="flex gap-2">
                  {['alta', 'media', 'baja'].map((p) => (
                    <button
                      key={p}
                      className="flex-1 py-3 rounded-xl text-xs font-black uppercase bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Notas</label>
                <textarea
                  rows={4}
                  placeholder="Detalles adicionales..."
                  className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 px-4 focus:border-blue-500 outline-none transition-all font-medium resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreate(false)}
                className="flex-1 bg-white border-2 border-slate-100 text-slate-600 py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                Cancelar
              </button>
              <button className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                <span>Enviar</span>
                <Check size={18} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {MOCK_REQUESTS.map((req, index) => (
              <motion.button
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  req.status === 'approved' ? 'bg-emerald-100 text-emerald-600' :
                  req.status === 'rejected' ? 'bg-rose-100 text-rose-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {req.status === 'approved' ? <Check size={24} /> :
                   req.status === 'rejected' ? <X size={24} /> :
                   <Clock size={24} />}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase">{req.id}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                      req.priority === 'alta' ? 'bg-rose-100 text-rose-600' :
                      req.priority === 'media' ? 'bg-amber-100 text-amber-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {req.priority}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mb-1">{req.title}</h3>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                    <User size={12} />
                    <span>{req.requester}</span>
                    <span>•</span>
                    <span>{req.date}</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </motion.button>
            ))}

            <button
              onClick={() => setShowCreate(true)}
              className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/40 flex items-center justify-center active:scale-90 transition-all"
            >
              <Plus size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};
