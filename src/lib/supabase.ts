import { createClient } from '@supabase/supabase-js';

// Using placeholder URLs - replace with real ones for production
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type UserRole = 'admin' | 'dispatcher' | 'driver' | 'warehouse';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
}

export interface Vehicle {
  id: string;
  license_plate: string;
  type: 'truck' | 'van' | 'car' | 'motorcycle';
  capacity: number;
  status: 'active' | 'idle' | 'maintenance';
  current_lat?: number;
  current_lng?: number;
  driver_id?: string;
}

export interface Driver {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  status: 'available' | 'on_route' | 'offline';
  vehicle_id?: string;
  rating: number;
}

export interface Order {
  id: string;
  customer_name: string;
  pickup_address: string;
  delivery_address: string;
  status: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  driver_id?: string;
  created_at: string;
  estimated_delivery?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  min_quantity: number;
  location: string;
  category: string;
}
