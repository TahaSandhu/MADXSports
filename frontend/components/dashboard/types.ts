export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  items: number;
  createdAt: Date;
  deliveryDate?: Date;
  trackingNumber?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

export interface DashboardStats {
  dailyOrders: number;
  weeklyOrders: number;
  monthlyOrders: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
  totalProducts: number;
  totalUsers: number;
}

export interface ParcelConfirmation {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: Date;
  confirmedAt: Date;
}