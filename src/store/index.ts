import { create } from 'zustand';
import { Vehicle, Driver, Order, InventoryItem, User } from '../lib/supabase';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  
  // Data
  vehicles: Vehicle[];
  drivers: Driver[];
  orders: Order[];
  inventory: InventoryItem[];
  
  // Actions
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Vehicle actions
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  
  // Order actions
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  
  // Inventory actions
  updateInventory: (id: string, quantity: number) => void;
}

// Demo data
const demoVehicles: Vehicle[] = [
  { id: '1', license_plate: 'ABC-123', type: 'truck', capacity: 5000, status: 'active', current_lat: -26.2041, current_lng: 28.0473 },
  { id: '2', license_plate: 'XYZ-987', type: 'van', capacity: 2000, status: 'active', current_lat: -26.2091, current_lng: 28.0523 },
  { id: '3', license_plate: 'DEF-456', type: 'truck', capacity: 8000, status: 'idle', current_lat: -26.2150, current_lng: 28.0400 },
  { id: '4', license_plate: 'GHI-789', type: 'car', capacity: 500, status: 'maintenance', current_lat: -26.2000, current_lng: 28.0300 },
  { id: '5', license_plate: 'JKL-012', type: 'van', capacity: 1500, status: 'active', current_lat: -26.2200, current_lng: 28.0600 },
];

const demoDrivers: Driver[] = [
  { id: '1', user_id: 'u1', full_name: 'John Smith', phone: '+27 82 123 4567', status: 'on_route', vehicle_id: '1', rating: 4.8 },
  { id: '2', user_id: 'u2', full_name: 'Sarah Johnson', phone: '+27 82 234 5678', status: 'available', vehicle_id: '2', rating: 4.9 },
  { id: '3', user_id: 'u3', full_name: 'Mike Brown', phone: '+27 82 345 6789', status: 'on_route', vehicle_id: '5', rating: 4.6 },
  { id: '4', user_id: 'u4', full_name: 'Emily Davis', phone: '+27 82 456 7890', status: 'offline', rating: 4.7 },
];

const demoOrders: Order[] = [
  { id: '1', customer_name: 'Tech Corp', pickup_address: '123 Main St, Johannesburg', delivery_address: '456 Oak Ave, Sandton', status: 'in_transit', priority: 'high', driver_id: '1', created_at: '2026-03-01T08:00:00Z', estimated_delivery: '2026-03-01T14:00:00Z' },
  { id: '2', customer_name: 'Retail Plus', pickup_address: '789 Market St', delivery_address: '321 Commerce Rd, Midrand', status: 'pending', priority: 'medium', created_at: '2026-03-01T09:30:00Z' },
  { id: '3', customer_name: 'Fresh Foods', pickup_address: '100 Food Market', delivery_address: '200 Kitchen Blvd, Centurion', status: 'assigned', priority: 'high', driver_id: '2', created_at: '2026-03-01T10:00:00Z', estimated_delivery: '2026-03-01T15:00:00Z' },
  { id: '4', customer_name: 'Office Supplies Co', pickup_address: '50 Stationery Lane', delivery_address: '75 Corporate Park', status: 'delivered', priority: 'low', driver_id: '1', created_at: '2026-02-28T14:00:00Z' },
  { id: '5', customer_name: 'Auto Parts Ltd', pickup_address: '500 Industrial Ave', delivery_address: '600 Workshop Rd', status: 'pending', priority: 'medium', created_at: '2026-03-01T11:00:00Z' },
];

const demoInventory: InventoryItem[] = [
  { id: '1', name: 'Package Box - Large', sku: 'PKG-LG-001', quantity: 500, min_quantity: 100, location: 'A1-01', category: 'Packaging' },
  { id: '2', name: 'Package Box - Medium', sku: 'PKG-MD-002', quantity: 75, min_quantity: 100, location: 'A1-02', category: 'Packaging' },
  { id: '3', name: 'Bubble Wrap Roll', sku: 'BWR-001', quantity: 200, min_quantity: 50, location: 'A2-01', category: 'Packaging' },
  { id: '4', name: 'Shipping Labels', sku: 'LBL-001', quantity: 50, min_quantity: 200, location: 'B1-01', category: 'Supplies' },
  { id: '5', name: 'Pallet Jack', sku: 'EQ-PJ-001', quantity: 10, min_quantity: 5, location: 'C1-01', category: 'Equipment' },
];

export const useStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  vehicles: demoVehicles,
  drivers: demoDrivers,
  orders: demoOrders,
  inventory: demoInventory,
  
  // Auth actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  login: async (email: string, password: string) => {
    // Demo login - accept any credentials
    const demoUser: User = {
      id: '1',
      email,
      full_name: email.split('@')[0],
      role: 'admin',
    };
    set({ user: demoUser, isAuthenticated: true });
    return true;
  },
  
  logout: () => set({ user: null, isAuthenticated: false }),
  
  // Vehicle actions
  addVehicle: (vehicle) => set((state) => ({ 
    vehicles: [...state.vehicles, vehicle] 
  })),
  
  updateVehicle: (id, updates) => set((state) => ({
    vehicles: state.vehicles.map(v => v.id === id ? { ...v, ...updates } : v)
  })),
  
  // Order actions
  addOrder: (order) => set((state) => ({ 
    orders: [...state.orders, order] 
  })),
  
  updateOrder: (id, updates) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, ...updates } : o)
  })),
  
  // Inventory actions
  updateInventory: (id, quantity) => set((state) => ({
    inventory: state.inventory.map(i => i.id === id ? { ...i, quantity } : i)
  })),
}));
