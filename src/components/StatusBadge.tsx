import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../lib/theme';

interface StatusBadgeProps {
  status: string;
}

const statusColors: Record<string, string> = {
  active: colors.success,
  idle: colors.warning,
  maintenance: colors.danger,
  available: colors.success,
  on_route: colors.secondary,
  offline: colors.textSecondary,
  pending: colors.warning,
  assigned: colors.secondary,
  in_transit: colors.accent,
  delivered: colors.success,
  cancelled: colors.danger,
  low: colors.textSecondary,
  medium: colors.warning,
  high: colors.danger,
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const backgroundColor = statusColors[status] || colors.textSecondary;
  
  return (
    <View style={[styles.badge, { backgroundColor: backgroundColor + '20' }]}>
      <Text style={[styles.text, { color: backgroundColor }]}>
        {status.replace('_', ' ').toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
});
