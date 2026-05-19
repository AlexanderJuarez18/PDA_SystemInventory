import React, { useState } from 'react';
import { 
  Trash2, 
  Camera, 
  Scan, 
  AlertCircle, 
  Check, 
  ChevronRight,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { Layout } from '../Components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

export const Merma: React.FC = () => {
  const [step, setStep] = useState<'scan' | 'details' | 'success'>('scan');
  const [scannedProduct, setScannedProduct] = useState<any>(null);
  const [reason, setReason] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);

  const handleScan = () => {
    // Mock scan
    setScannedProduct({
      sku: 'PROD-001',
      name: 'Caja de Herramientas Industrial',
      stock: 45
    });
    setStep('details');
  };

  const handleAddPhoto = () => {
    // Mock photo capture
    const mockPhoto = 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=400&fit=crop';
    setPhotos([...photos, mockPhoto]);
  };

  const handleSubmit = () => {
    setStep('success');
  };

  return (
    <Layout title="Registro de Merma">
      <AnimatePresence mode="wait">
        {step === 'scan' && (
          <motion.div 
            key="scan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-12 space-y-8"
          >
            <div className="w-40 h-40 bg-rose-50 rounded-[3rem] flex items-center justify-center text-rose-500 border-4 border-dashed border-rose-200">
              <Trash2 size={80} />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Reportar Daño</h2>
              <p className="text-slate-500 font-medium px-8">Escanee el producto dañado para iniciar el reporte de merma.</p>
            </div>
            <button 
              onClick={handleScan}
              className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/20 active:scale-95 transition-all"
            >
              <Scan size={28} />
              <span>Escanear Producto</span>
            </button>
          </motion.div>
        )}

        {step === 'details' && (
          <motion.div 
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Product Card */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                <ImageIcon size={32} />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{scannedProduct.sku}</span>
                <h3 className="text-lg font-black text-slate-900">{scannedProduct.name}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase">Stock: {scannedProduct.stock} unid.</p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Cantidad Dañada</label>
                <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-black text-xl active:scale-90 transition-all"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center text-xl font-black text-slate-900">{quantity}</div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-black text-xl active:scale-90 transition-all"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Motivo de Merma</label>
                <select 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-2xl py-4 px-4 focus:border-rose-500 outline-none transition-all font-bold text-slate-700 shadow-sm appearance-none"
                >
                  <option value="">Seleccione un motivo...</option>
                  <option value="damaged">Empaque Dañado</option>
                  <option value="expired">Producto Caducado</option>
                  <option value="broken">Ruptura / Derrame</option>
                  <option value="defect">Defecto de Fábrica</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase ml-2">Evidencia Fotográfica</label>
                <div className="grid grid-cols-3 gap-3">
                  {photos.map((photo, i) => (
                    <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group">
                      <img src={photo} alt="Evidencia" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-lg"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {photos.length < 3 && (
                    <button 
                      onClick={handleAddPhoto}
                      className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-1 active:bg-slate-100 transition-all"
                    >
                      <Camera size={24} />
                      <span className="text-[8px] font-black uppercase">Capturar</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setStep('scan')}
                className="flex-1 bg-white border-2 border-slate-100 text-slate-600 py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!reason || photos.length === 0}
                className="flex-1 bg-rose-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Enviar</span>
                <Check size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 space-y-8"
          >
            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40">
              <Check size={64} strokeWidth={3} />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Reporte Enviado</h2>
              <p className="text-slate-500 font-medium px-8">El reporte de merma ha sido registrado correctamente y enviado a supervisión.</p>
            </div>
            <button 
              onClick={() => setStep('scan')}
              className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest active:scale-95 transition-all"
            >
              Nuevo Reporte
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};
