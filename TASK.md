# FleetFlow - Logistics Management Platform

## Project Setup
- Location: /home/kgothatso012/.openclaw/workspace/FleetFlow-app
- Tech: Expo SDK 53, React Native, Supabase

## First Task - Build Core Structure

Create the following:

### 1. App.tsx
- Navigation setup with React Navigation
- Bottom tabs: Dashboard, Fleet, Orders, Warehouse, Settings
- Auth flow with Supabase

### 2. Theme & Constants (src/lib/theme.ts)
```typescript
export const colors = {
  primary: '#1E3A5F',
  secondary: '#4A90D9',
  accent: '#00D4AA',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
};
```

### 3. Supabase Client (src/lib/supabase.ts)
- Create client with env vars
- Export types for User, Vehicle, Order, Driver, etc.

### 4. Store (src/store/index.ts)
- Zustand store for:
  - user (auth state)
  - vehicles (fleet)
  - orders
  - selectedTab

### 5. Screens to Create:
- **DashboardScreen** - Overview stats, mini map
- **FleetScreen** - Vehicle list with status badges
- **OrdersScreen** - Order list with status
- **WarehouseScreen** - Inventory list
- **SettingsScreen** - Profile, logout

### 6. Components:
- **StatCard** - For dashboard metrics
- **VehicleCard** - Vehicle item in list
- **OrderCard** - Order item in list
- **StatusBadge** - Colored status pill

## Style Guidelines
- Use the color palette defined
- Card-based layouts with subtle shadows
- Clean, professional look
- Use react-native StyleSheet

## Next Steps (Future)
- Auth screens (Login/Register)
- Real Supabase integration
- Maps integration
- Driver app features

Start by creating the folder structure and core files.
