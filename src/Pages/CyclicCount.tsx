import React, { useState } from 'react';
import { RefreshCw, Check, X, Package, MapPin, AlertCircle, Scan } from 'lucide-react';
import { Layout } from '../Components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_CYCLIC_ZONES = [
  { id: 'ZONA-A', name: 'Zona A - Herramientas', total: 45, counted: 32, status: 'in_progress' },
  { id: 'ZONA-B', name: 'Zona B - Materiales', total: 120, counted: 120, status: 'completed' },
  { id: 'ZONA-C', name: 'Zona C - Seguridad', total: 28, counted: 0, status: 'pending' },
];

export const CyclicCount: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [counting, setCounting] = useState(false);
  const [scanned, setScanned] = useState<string[]>([]);

  if (selectedZone) {
    const zone = MOCK_CYCLIC_ZONES.find(z => z.id === selectedZone);
    
    if (counting) {
      return (
        <Layout title={`Conteo ${selectedZone}`}>
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Zona</p>
                  <h2 className="text-2xl font-black">{zone?.name}</h2>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black">{scanned.length}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">escaneados</p>
                </div>
              </div>
              <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(scanned.length / (zone?.total || 1)) * 100}%` }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>

            {/* Scanning Area */}
            <div className="bg-white rounded-[2.5rem] p-8 border-2 border-dashed border-slate-200 text-center">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scan size={48} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Escanee Producto</h3>
              <p className="text-sm text-slate-500 font-medium">Posicione el código de barras en el área de escaneo</p>
              
              <button 
                onClick={() => setScanned([...scanned, `PROD-${scanned.length + 1}`])}
                className="mt-6 w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
              >
                Simular Escaneo
              </button>
            </div>

            {/* Scanned Items */}
            {scanned.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-400 uppercase ml-2">Últimos Escaneados</h4>
                <div className="flex flex-wrap gap-2">
                  {scanned.slice(-5).map((s, i) => (
                    <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button 
                onClick={() => setCounting(false)}
                className="flex-1 bg-white border-2 border-slate-100 text-slate-600 py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                Pausar
              </button>
              <button 
                onClick={() => {
                  setSelectedZone(null);
                  setCounting(false);
                  setScanned([]);
                }}
                className="flex-1 bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Finalizar</span>
                <Check size={18} />
              </button>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout title={`Zona ${selectedZone}`}>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Zona</p>
                <h2 className="text-xl font-black text-slate-900">{zone?.name}</h2>
              </div>
              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                zone?.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                zone?.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                'bg-slate-100 text-slate-500'
              }`}>
                {zone?.status === 'completed' ? 'Completado' :
                 zone?.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Total</p>
                <p className="text-2xl font-black text-slate-900">{zone?.total}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Contados</p>
                <p className="text-2xl font-black text-emerald-600">{zone?.counted}</p>
              </div>
            </div>

            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${((zone?.counted || 0) / (zone?.total || 1)) * 100}%` }}
              />
            </div>
          </div>

          <button 
            onClick={() => setCounting(true)}
            className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <RefreshCw size={24} />
            <span>Iniciar Conteo</span>
          </button>

          <button 
            onClick={() => setSelectedZone(null)}
            className="w-full bg-white border-2 border-slate-100 text-slate-600 py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
          >
            Volver
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Conteo Cíclico">
      <div className="space-y-4">
        {MOCK_CYCLIC_ZONES.map((zone, index) => (
          <motion.button
            key={zone.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedZone(zone.id)}
            className="w-full bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              zone.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
              zone.status === 'in_progress' ? 'bg-blue-50 text-blue-600' :
              'bg-slate-50 text-slate-400'
            }`}>
              {zone.status === 'completed' ? <Check size={28} /> : <RefreshCw size={28} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black text-slate-400 uppercase">{zone.id}</span>
                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                  zone.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                  zone.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {zone.status === 'completed' ? 'Completado' :
                   zone.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 mb-2">{zone.name}</h3>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    zone.status === 'completed' ? 'bg-emerald-500' :
                    zone.status === 'in_progress' ? 'bg-blue-500' :
                    'bg-slate-300'
                  }`}
                  style={{ width: `${(zone.counted / zone.total) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-1 text-[10px] font-bold text-slate-400 uppercase">
                <span>{zone.counted} contados</span>
                <span>{zone.total} total</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </Layout>
  );
};
