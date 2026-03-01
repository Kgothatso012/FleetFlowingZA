import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Order } from '../lib/supabase';
import { StatusBadge } from './StatusBadge';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';

interface OrderCardProps {
  order: Order;
  onPress?: () => void;
}

export function OrderCard({ order, onPress }: OrderCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.customer}>{order.customer_name}</Text>
        <StatusBadge status={order.status} />
      </View>
      <View style={styles.route}>
        <View style={styles.routePoint}>
          <Text style={styles.routeLabel}>FROM</Text>
          <Text style={styles.routeText}>{order.pickup_address}</Text>
        </View>
        <View style={styles.routePoint}>
          <Text style={styles.routeLabel}>TO</Text>
          <Text style={styles.routeText}>{order.delivery_address}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <StatusBadge status={order.priority} />
        {order.estimated_delivery && (
          <Text style={styles.eta}>ETA: {new Date(order.estimated_delivery).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        )}
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
  customer: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  route: {
    marginBottom: spacing.sm,
  },
  routePoint: {
    marginBottom: spacing.xs,
  },
  routeLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  routeText: {
    fontSize: 13,
    color: colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
