import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  ChevronRight, 
  Package, 
  MapPin, 
  AlertCircle,
  Plus,
  Download
} from 'lucide-react';
import { Layout } from '../Components/Layout';
import useInventoryStore, { Product } from '../store/useInventoryStore';
import { motion } from 'framer-motion';

export const Inventory: React.FC = () => {
  const { products } = useInventoryStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low' | 'critical'>('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.sku.toLowerCase().includes(search.toLowerCase()) ||
                         p.location.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'low') return matchesSearch && p.stock < 50 && p.stock >= 15;
    if (filter === 'critical') return matchesSearch && p.stock < 15;
    return matchesSearch;
  });

  return (
    <Layout title="Inventario Real">
      <div className="space-y-6">
        {/* Search & Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por SKU, nombre o ubicación..."
              className="w-full bg-white border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-all font-medium shadow-sm"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[
              { id: 'all', label: 'Todos', count: products.length },
              { id: 'low', label: 'Stock Bajo', count: products.filter(p => p.stock < 50 && p.stock >= 15).length },
              { id: 'critical', label: 'Crítico', count: products.filter(p => p.stock < 15).length },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  filter === f.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-500 border border-slate-100'
                }`}
              >
                <span>{f.label}</span>
                <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${filter === f.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.sku}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4 active:scale-[0.98] transition-all"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter truncate">
                      {product.sku}
                    </span>
                    <div className="flex items-center gap-1 text-slate-400">
                      <MapPin size={10} />
                      <span className="text-[9px] font-bold uppercase">{product.location}</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 truncate mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-black ${product.stock < 15 ? 'text-rose-600' : product.stock < 50 ? 'text-amber-600' : 'text-slate-900'}`}>
                        {product.stock}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">unid.</span>
                    </div>
                    {product.stock < 15 && (
                      <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        <AlertCircle size={12} />
                        <span className="text-[8px] font-black uppercase">Reabastecer</span>
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300" />
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Package size={40} className="text-slate-300" />
              </div>
              <p className="text-slate-500 font-bold">No se encontraron productos</p>
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-24 right-6 flex flex-col gap-3">
          <button className="w-14 h-14 bg-white text-slate-900 rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 active:scale-90 transition-all">
            <Download size={24} />
          </button>
          <button className="w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/40 flex items-center justify-center active:scale-90 transition-all">
            <Plus size={24} />
          </button>
        </div>
      </div>
    </Layout>
  );
};
