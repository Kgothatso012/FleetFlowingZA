import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  color?: string;
}

export function StatCard({ title, value, subtitle, color = colors.primary }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.card,
    minWidth: 140,
  },
  title: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
