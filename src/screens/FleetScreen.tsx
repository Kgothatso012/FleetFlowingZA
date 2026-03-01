import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStore } from '../store';
import { VehicleCard } from '../components/VehicleCard';
import { colors, spacing } from '../lib/theme';

export function FleetScreen() {
  const { vehicles } = useStore();
  
  const activeCount = vehicles.filter(v => v.status === 'active').length;
  const idleCount = vehicles.filter(v => v.status === 'idle').length;
  const maintenanceCount = vehicles.filter(v => v.status === 'maintenance').length;
  
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={[styles.summaryItem, { backgroundColor: colors.success + '20' }]}>
          <Text style={[styles.summaryValue, { color: colors.success }]}>{activeCount}</Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={[styles.summaryItem, { backgroundColor: colors.warning + '20' }]}>
          <Text style={[styles.summaryValue, { color: colors.warning }]}>{idleCount}</Text>
          <Text style={styles.summaryLabel}>Idle</Text>
        </View>
        <View style={[styles.summaryItem, { backgroundColor: colors.danger + '20' }]}>
          <Text style={[styles.summaryValue, { color: colors.danger }]}>{maintenanceCount}</Text>
          <Text style={styles.summaryLabel}>Maintenance</Text>
        </View>
      </View>
      
      <FlatList
        data={vehicles}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <VehicleCard vehicle={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  summary: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.sm,
  },
  summaryItem: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  list: {
    padding: spacing.md,
    paddingTop: 0,
  },
});
