import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Package,
  BarChart3
} from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$128,430', change: '+12.5%', isUp: true, icon: DollarSign },
  { label: 'Active Orders', value: '1,240', change: '+5.2%', isUp: true, icon: ShoppingCart },
  { label: 'Total Customers', value: '45,231', change: '-2.4%', isUp: false, icon: Users },
  { label: 'Product Stock', value: '8,122', change: '+0.8%', isUp: true, icon: Package },
];

const recentOrders = [
  { id: '#89231', customer: 'Alex Rivera', status: 'Delivered', amount: '$120.00', date: 'Oct 24, 2023' },
  { id: '#89230', customer: 'Sarah Jenkins', status: 'Processing', amount: '$450.00', date: 'Oct 23, 2023' },
  { id: '#89229', customer: 'Michael Chen', status: 'Shipped', amount: '$89.50', date: 'Oct 23, 2023' },
  { id: '#89228', customer: 'Emma Watson', status: 'Pending', amount: '$2,100.00', date: 'Oct 22, 2023' },
  { id: '#89227', customer: 'John Doe', status: 'Cancelled', amount: '$0.00', date: 'Oct 22, 2023' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Marketplace Overview</h2>
          <p className="text-[#666] font-medium">Real-time performance metrics for your ecosystem.</p>
        </div>
        <div className="flex items-center bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-1 shrink-0">
          <button className="px-4 py-2 text-xs font-bold bg-[#ff1744] text-white rounded-lg shadow-[0_0_15px_rgba(255,23,68,0.2)]">24H</button>
          <button className="px-4 py-2 text-xs font-bold text-[#444] hover:text-[#888] transition-colors">7D</button>
          <button className="px-4 py-2 text-xs font-bold text-[#444] hover:text-[#888] transition-colors">30D</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-surface border border-border-dim p-5 rounded-lg hover:border-brand-red/30 transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-red/10 transition-colors" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red">
                  <Icon size={18} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.isUp ? 'text-emerald-500' : 'text-brand-red'}`}>
                  {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-text-dim text-[10px] font-bold uppercase tracking-wider mb-2">{stat.label}</h3>
              <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts / Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Mockup */}
        <div className="lg:col-span-2 bg-bg-surface border border-border-dim rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border-dim flex items-center justify-between">
            <h3 className="font-bold text-base text-white">Recent Transactions</h3>
            <button className="text-[10px] font-bold text-brand-red tracking-widest uppercase hover:underline">
              VIEW ALL DATA
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-bg-surface">
                  <th className="px-6 py-4 text-[10px] font-bold text-text-dim uppercase tracking-widest border-b border-border-dim">Order ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-dim uppercase tracking-widest border-b border-border-dim">Customer</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-dim uppercase tracking-widest border-b border-border-dim">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-dim uppercase tracking-widest border-b border-border-dim text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dim/50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-4 text-xs font-mono text-brand-red">{order.id.replace('#', '#ORD-')}</td>
                    <td className="px-6 py-4 text-xs font-medium text-white">{order.customer}</td>
                    <td className="px-6 py-4">
                      <span className={`
                        px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                        ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' : ''}
                        ${order.status === 'Processing' ? 'bg-brand-red/10 text-brand-red' : ''}
                        ${order.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' : ''}
                        ${order.status === 'Pending' ? 'bg-gray-500/10 text-gray-500' : ''}
                        ${order.status === 'Cancelled' ? 'bg-zinc-800 text-text-dim' : ''}
                      `}>
                        {order.status === 'Delivered' ? 'Completed' : order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-white text-right">{order.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small Analytics Widget */}
        <div className="bg-bg-surface border border-border-dim rounded-lg p-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-red/15 transition-all duration-700" />
          
          <div className="relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 bg-white/5 border border-border-dim rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="text-brand-red" size={24} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4 leading-tight shrink-0 italic">Scale Performance.</h3>
            <p className="text-text-dim text-sm leading-relaxed mb-8 font-medium">You've reached 85% of your monthly targets. Advanced reporting available for Pro users.</p>
            
            <div className="mt-auto">
              <div className="w-full bg-border-dim rounded-full h-1.5 mb-4 overflow-hidden">
                <div className="bg-brand-red h-full rounded-full w-[85%] red-glow shadow-[0_0_8px_rgba(255,23,68,0.4)]" />
              </div>
              <button className="w-full bg-brand-red hover:bg-brand-red/90 text-white text-xs font-bold py-3.5 rounded-lg transition-all active:scale-[0.98] uppercase tracking-wider">
                Upgrade Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
