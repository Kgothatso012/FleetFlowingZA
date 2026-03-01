import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useStore } from '../store';
import { StatCard } from '../components/StatCard';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';

const { width } = Dimensions.get('window');

export function DashboardScreen() {
  const { vehicles, drivers, orders, inventory } = useStore();
  
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const availableDrivers = drivers.filter(d => d.status === 'available').length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const inTransit = orders.filter(o => o.status === 'in_transit').length;
  const lowStock = inventory.filter(i => i.quantity < i.min_quantity).length;
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Fleet Overview</Text>
      <Text style={styles.subtitle}>{new Date().toLocaleDateString('en-ZA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <StatCard title="Active Vehicles" value={activeVehicles} subtitle={`of ${vehicles.length} total`} color={colors.success} />
          <StatCard title="Available Drivers" value={availableDrivers} subtitle={`of ${drivers.length} total`} color={colors.accent} />
        </View>
        <View style={styles.statsRow}>
          <StatCard title="Pending Orders" value={pendingOrders} color={colors.warning} />
          <StatCard title="In Transit" value={inTransit} color={colors.secondary} />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alerts</Text>
        {lowStock > 0 ? (
          <View style={styles.alert}>
            <Text style={styles.alertText}>⚠️ {lowStock} items are running low on stock</Text>
          </View>
        ) : (
          <View style={styles.alert}>
            <Text style={styles.alertText}>✅ All inventory levels are healthy</Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        {orders.slice(0, 3).map(order => (
          <View key={order.id} style={styles.orderItem}>
            <View>
              <Text style={styles.orderCustomer}>{order.customer_name}</Text>
              <Text style={styles.orderAddress}>{order.delivery_address}</Text>
            </View>
            <Text style={styles.orderStatus}>{order.status.replace('_', ' ')}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fleet Status</Text>
        <View style={styles.fleetBars}>
          <View style={styles.fleetBar}>
            <View style={[styles.barSegment, { backgroundColor: colors.success, flex: activeVehicles }]} />
            <View style={[styles.barSegment, { backgroundColor: colors.warning, flex: vehicles.filter(v => v.status === 'idle').length }]} />
            <View style={[styles.barSegment, { backgroundColor: colors.danger, flex: vehicles.filter(v => v.status === 'maintenance').length }]} />
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
              <Text style={styles.legendText}>Active ({activeVehicles})</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.warning }]} />
              <Text style={styles.legendText}>Idle</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.danger }]} />
              <Text style={styles.legendText}>Maintenance</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  statsGrid: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  alert: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.card,
  },
  alertText: {
    fontSize: 14,
    color: colors.text,
  },
  orderItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...shadows.card,
  },
  orderCustomer: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  orderAddress: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
    textTransform: 'capitalize',
  },
  fleetBars: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.card,
  },
  fleetBar: {
    height: 12,
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  barSegment: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
