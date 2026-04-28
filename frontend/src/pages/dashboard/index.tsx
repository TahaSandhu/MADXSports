import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  BarChart3
} from 'lucide-react';
import { useOrdersApi } from '@/hooks/checkout';

export default function Dashboard() {
  const { getDashboardStats, loading, error } = useOrdersApi();

  const [stats, setStats] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getDashboardStats();

      setStats([
        {
          label: 'Total Revenue',
          value: `$${data.totalRevenue.toFixed(2)}`,
          isUp: true,
          icon: DollarSign
        },
        {
          label: 'Total Orders',
          value: data.totalOrders,
          isUp: true,
          icon: ShoppingCart
        },
        {
          label: 'Pending Orders',
          value: data.pending,
          isUp: false,
          icon: Package
        },
        {
          label: 'Customers',
          value: data.totalCustomers,
          isUp: true,
          icon: Users
        }
      ]);

      setRecentOrders(data.recentOrders);
    };

    load();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Marketplace Overview</h2>
          <p className="text-[#666] font-medium">Real-time performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-surface border border-border-dim p-5 rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 bg-brand-red/10 rounded-lg flex items-center justify-center text-brand-red">
                  <Icon size={18} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                  {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                </div>
              </div>
              <h3 className="text-text-dim text-[10px] font-bold uppercase mb-2">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-bg-surface border border-border-dim rounded-lg overflow-hidden">
        <div className="p-6 border-b border-border-dim flex justify-between">
          <h3 className="font-bold text-white">Recent Orders</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-4 text-xs text-text-dim">Order</th>
                <th className="px-6 py-4 text-xs text-text-dim">Customer</th>
                <th className="px-6 py-4 text-xs text-text-dim">Status</th>
                <th className="px-6 py-4 text-xs text-text-dim text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order: any) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 text-xs text-brand-red">
                    #{order._id.slice(-6)}
                  </td>

                  <td className="px-6 py-4 text-xs text-white">
                    {order.firstName} {order.lastName}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`
                      px-2 py-1 text-xs rounded
                      ${order.deliveryStatus === 'delivered' ? 'text-green-500' : ''}
                      ${order.deliveryStatus === 'processing' ? 'text-blue-500' : ''}
                      ${order.deliveryStatus === 'pending' ? 'text-gray-400' : ''}
                      ${order.deliveryStatus === 'cancelled' ? 'text-red-500' : ''}
                    `}>
                      {order.deliveryStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs text-white text-right">
                    ${order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-bg-surface border border-border-dim rounded-lg p-8">
        <div className="flex flex-col items-start">
          <BarChart3 className="text-brand-red mb-4" size={28} />
          <h3 className="text-xl font-bold text-white mb-2">Performance</h3>
          <p className="text-text-dim text-sm mb-4">
            Orders and revenue are updating in real time.
          </p>
        </div>
      </div>
    </div>
  );
}