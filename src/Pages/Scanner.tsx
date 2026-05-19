import React, { useState, useEffect, useRef } from 'react';
import { 
  Scan, 
  X, 
  Zap, 
  History, 
  Layers, 
  Check, 
  AlertCircle,
  Info,
  ChevronRight,
  Volume2,
  Vibrate
} from 'lucide-react';
import { Layout } from '../Components/Layout';
import useInventoryStore, { Product } from '../store/useInventoryStore';
import { motion, AnimatePresence } from 'framer-motion';
import * as mobileFeatures from '../utils/mobileFeatures';

export const Scanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [lastScanned, setLastScanned] = useState<Product | null>(null);
  const [mode, setMode] = useState<'single' | 'continuous' | 'massive'>('single');
  const [flash, setFlash] = useState(false);
  const [scanCount, setScanCount] = useState(0);
  
  const { products, addToHistory, scannedHistory } = useInventoryStore();

  const handleScan = (sku: string) => {
    const product = products.find(p => p.sku === sku);
    
    if (product) {
      setLastScanned(product);
      addToHistory(product);
      setScanCount(prev => prev + 1);
      
      // Feedback
      if (mobileFeatures.isInWebView()) {
        mobileFeatures.callNative('hapticFeedback', { type: 'medium' });
        mobileFeatures.callNative('playSound', { name: 'scan_success' });
      }

      if (mode === 'single') {
        setIsScanning(false);
      }
    } else {
      // Error feedback
      if (mobileFeatures.isInWebView()) {
        mobileFeatures.callNative('hapticFeedback', { type: 'error' });
      }
    }
  };

  // Mock auto-scan for demo
  useEffect(() => {
    if (isScanning && mode !== 'massive') {
      const timer = setTimeout(() => {
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        handleScan(randomProduct.sku);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isScanning, mode]);

  return (
    <Layout title="Escáner Industrial" showNav={!isScanning}>
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Scanner Viewport */}
        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          {/* Mock Camera Feed */}
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
            <div className="w-full h-full opacity-20 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
          </div>

          {/* Scanning Frame */}
          <div className="relative w-64 h-64 border-2 border-white/30 rounded-[2rem]">
            <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl" />
            <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl" />
            <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl" />
            
            {/* Laser Line */}
            <motion.div 
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute left-4 right-4 h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"
            />
          </div>

          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
            <button 
              onClick={() => setIsScanning(false)}
              className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setFlash(!flash)}
                className={`w-12 h-12 backdrop-blur-md rounded-2xl flex items-center justify-center transition-all ${flash ? 'bg-amber-500 text-white' : 'bg-white/10 text-white'}`}
              >
                <Zap size={24} fill={flash ? 'currentColor' : 'none'} />
              </button>
              <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                <Volume2 size={24} />
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="absolute bottom-32 left-6 right-6 flex justify-center gap-2">
            {[
              { id: 'single', label: 'Único', icon: Scan },
              { id: 'continuous', label: 'Continuo', icon: RefreshCw },
              { id: 'massive', label: 'Masivo', icon: Layers },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  mode === m.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'bg-white/10 text-white backdrop-blur-md'
                }`}
              >
                <m.icon size={16} />
                <span>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result Panel */}
        <AnimatePresence>
          {lastScanned && (
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-[3rem] p-8 shadow-2xl z-50"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 bg-slate-100 rounded-3xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={lastScanned.image} alt={lastScanned.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider mb-2 inline-block">
                      SKU: {lastScanned.sku}
                    </span>
                    <div className="flex items-center gap-1 text-emerald-600 font-black text-xs">
                      <Check size={14} />
                      <span>VALIDADO</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{lastScanned.name}</h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2">{lastScanned.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Stock Actual</p>
                  <p className="text-xl font-black text-slate-900">{lastScanned.stock} <span className="text-xs font-bold text-slate-500">unid.</span></p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Ubicación</p>
                  <p className="text-xl font-black text-slate-900">{lastScanned.location}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setLastScanned(null)}
                  className="flex-1 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
                >
                  Cerrar
                </button>
                <button 
                  className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Ver Ficha</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Massive Scan Counter */}
        {mode === 'massive' && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-full font-black text-lg shadow-2xl flex items-center gap-4">
            <Layers size={24} />
            <span>{scanCount} ESCANEADOS</span>
            <button 
              onClick={() => {
                setScanCount(0);
                setIsScanning(false);
              }}
              className="bg-white text-blue-600 px-4 py-1 rounded-full text-xs"
            >
              FINALIZAR
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

const RefreshCw = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);
