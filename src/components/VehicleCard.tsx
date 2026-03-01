import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Vehicle } from '../lib/supabase';
import { StatusBadge } from './StatusBadge';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress?: () => void;
}

export function VehicleCard({ vehicle, onPress }: VehicleCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.plate}>{vehicle.license_plate}</Text>
        <StatusBadge status={vehicle.status} />
      </View>
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Type</Text>
          <Text style={styles.value}>{vehicle.type}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Capacity</Text>
          <Text style={styles.value}>{vehicle.capacity} kg</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  plate: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
});
