import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Check, 
  X, 
  Scan, 
  ClipboardList, 
  ChevronRight,
  AlertCircle,
  Package,
  User,
  Calendar
} from 'lucide-react';
import { Layout } from '../Components/Layout';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderItem {
  id: string;
  sku: string;
  name: string;
  expected: number;
  scanned: number;
  status: 'pending' | 'partial' | 'completed';
}

const MOCK_ORDERS = {
  inbound: [
    { id: 'REC-9021', provider: 'Industrial Tools SA', date: '2024-05-18', items: 12, status: 'pending' },
    { id: 'REC-9022', provider: 'Global Logistics', date: '2024-05-18', items: 5, status: 'partial' },
  ],
  outbound: [
    { id: 'PICK-4412', client: 'Taller Central', date: '2024-05-18', items: 8, status: 'pending' },
    { id: 'PICK-4413', client: 'Suministros Norte', date: '2024-05-18', items: 24, status: 'completed' },
  ]
};

const MOCK_ORDER_ITEMS: OrderItem[] = [
  { id: '1', sku: 'PROD-001', name: 'Caja de Herramientas Industrial', expected: 10, scanned: 0, status: 'pending' },
  { id: '2', sku: 'PROD-002', name: 'Guantes de Protección Nitrilo', expected: 50, scanned: 50, status: 'completed' },
  { id: '3', sku: 'PROD-003', name: 'Casco de Seguridad V-Gard', expected: 5, scanned: 2, status: 'partial' },
];

export const Orders: React.FC = () => {
  const { type } = useParams<{ type: 'inbound' | 'outbound' }>();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [items, setItems] = useState<OrderItem[]>(MOCK_ORDER_ITEMS);
  const navigate = useNavigate();

  const isOutbound = type === 'outbound';
  const title = isOutbound ? 'Órdenes de Salida' : 'Órdenes de Entrada';
  const orders = isOutbound ? MOCK_ORDERS.outbound : MOCK_ORDERS.inbound;

  if (selectedOrder) {
    return (
      <Layout title={`${isOutbound ? 'Picking' : 'Recepción'} - ${selectedOrder}`}>
        <div className="space-y-6">
          {/* Order Info Header */}
          <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">
                  {isOutbound ? 'Cliente' : 'Proveedor'}
                </p>
                <h2 className="text-xl font-black">
                  {isOutbound ? 'Taller Central' : 'Industrial Tools SA'}
                </h2>
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold">
                {items.filter(i => i.status === 'completed').length} / {items.length} Items
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <Calendar size={14} />
                <span>18 Mayo, 2024</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <User size={14} />
                <span>Asignado: Carlos R.</span>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white p-5 rounded-[2rem] border-2 transition-all ${
                  item.status === 'completed' ? 'border-emerald-100 bg-emerald-50/30' : 'border-slate-100'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{item.sku}</span>
                    <h3 className="text-sm font-black text-slate-900">{item.name}</h3>
                  </div>
                  {item.status === 'completed' ? (
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                      <Check size={18} />
                    </div>
                  ) : (
                    <button className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 active:scale-90 transition-all">
                      <Scan size={20} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.scanned / item.expected) * 100}%` }}
                      className={`h-full ${item.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    />
                  </div>
                  <div className="flex items-center gap-2 min-w-[80px] justify-end">
                    <span className="text-lg font-black text-slate-900">{item.scanned}</span>
                    <span className="text-xs font-bold text-slate-400">/ {item.expected}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="flex-1 bg-white border-2 border-slate-100 text-slate-600 py-5 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
            >
              Pausar
            </button>
            <button 
              className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
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
    <Layout title={title}>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.button
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedOrder(order.id)}
            className="w-full bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm text-left flex items-center gap-4 active:scale-[0.98] transition-all group"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isOutbound ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {isOutbound ? <ArrowUpCircle size={28} /> : <ArrowDownCircle size={28} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{order.id}</span>
                <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-md ${
                  order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-600' : 
                  order.status === 'partial' ? 'bg-amber-500/10 text-amber-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  {order.status === 'completed' ? 'Completado' : order.status === 'partial' ? 'Parcial' : 'Pendiente'}
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 mb-1">
                {isOutbound ? (order as any).client : (order as any).provider}
              </h3>
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
                <span className="flex items-center gap-1"><Package size={12} /> {order.items} Items</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {order.date}</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
          </motion.button>
        ))}
      </div>
    </Layout>
  );
};