import React, { useState } from 'react';
import { MoveHorizontal, ArrowRight, MapPin, Package, Check, Clock, ChevronRight } from 'lucide-react';
import { Layout } from '../Components/Layout';
import { motion } from 'framer-motion';

const MOCK_TRANSFERS = [
  { id: 'TRF-001', from: 'Almacén A', to: 'Almacén B', items: 24, status: 'in_progress', date: '18 May' },
  { id: 'TRF-002', from: 'Almacén Central', to: 'Punto B', items: 12, status: 'completed', date: '17 May' },
  { id: 'TRF-003', from: 'Zona 1', to: 'Zona 3', items: 8, status: 'pending', date: '16 May' },
];

export const Transfers: React.FC = () => {
  const [selectedTransfer, setSelectedTransfer] = useState<string | null>(null);

  if (selectedTransfer) {
    const transfer = MOCK_TRANSFERS.find(t => t.id === selectedTransfer);
    return (
      <Layout title={`Transferencia ${selectedTransfer}`}>
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black text-blue-400 uppercase tracking-widest">{transfer?.id}</span>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                transfer?.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                transfer?.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                'bg-amber-500/20 text-amber-400'
              }`}>
                {transfer?.status === 'completed' ? 'Completado' :
                 transfer?.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Origen</p>
                <p className="text-lg font-black">{transfer?.from}</p>
              </div>
              <ArrowRight size={32} className="text-slate-600" />
              <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Destino</p>
                <p className="text-lg font-black">{transfer?.to}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
              <Package size={14} />
              <span>{transfer?.items} Items</span>
              <span>•</span>
              <span>{transfer?.date}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase ml-2">Items a Transferir</h3>
            {[
              { sku: 'PROD-001', name: 'Caja de Herramientas', qty: 10 },
              { sku: 'PROD-002', name: 'Guantes de Protección', qty: 50 },
              { sku: 'PROD-003', name: 'Casco de Seguridad', qty: 5 },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">{item.sku}</p>
                  <p className="text-sm font-black text-slate-900">{item.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-slate-900">{item.qty}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">unid.</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setSelectedTransfer(null)}
              className="flex-1 bg-white border-2 border-slate-100 text-slate-600 py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
            >
              Volver
            </button>
            <button className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span>Confirmar</span>
              <Check size={18} />
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Transferencias">
      <div className="space-y-4">
        {MOCK_TRANSFERS.map((transfer, index) => (
          <motion.button
            key={transfer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedTransfer(transfer.id)}
            className="w-full bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              transfer.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
              transfer.status === 'in_progress' ? 'bg-blue-50 text-blue-600' :
              'bg-amber-50 text-amber-600'
            }`}>
              <MoveHorizontal size={28} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black text-slate-400 uppercase">{transfer.id}</span>
                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                  transfer.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                  transfer.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                  'bg-amber-100 text-amber-600'
                }`}>
                  {transfer.status === 'completed' ? 'Completado' :
                   transfer.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-black text-slate-900 mb-1">
                <span>{transfer.from}</span>
                <ArrowRight size={14} className="text-slate-400" />
                <span>{transfer.to}</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                <Package size={12} />
                <span>{transfer.items} Items</span>
                <span>•</span>
                <span>{transfer.date}</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-300" />
          </motion.button>
        ))}
      </div>
    </Layout>
  );
};
