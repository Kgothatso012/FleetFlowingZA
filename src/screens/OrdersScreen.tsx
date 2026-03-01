import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStore } from '../store';
import { OrderCard } from '../components/OrderCard';
import { colors, spacing } from '../lib/theme';

export function OrdersScreen() {
  const { orders } = useStore();
  
  const pending = orders.filter(o => o.status === 'pending').length;
  const inTransit = orders.filter(o => o.status === 'in_transit').length;
  const delivered = orders.filter(o => o.status === 'delivered').length;
  
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={[styles.summaryItem, { backgroundColor: colors.warning + '20' }]}>
          <Text style={[styles.summaryValue, { color: colors.warning }]}>{pending}</Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={[styles.summaryItem, { backgroundColor: colors.secondary + '20' }]}>
          <Text style={[styles.summaryValue, { color: colors.secondary }]}>{inTransit}</Text>
          <Text style={styles.summaryLabel}>In Transit</Text>
        </View>
        <View style={[styles.summaryItem, { backgroundColor: colors.success + '20' }]}>
          <Text style={[styles.summaryValue, { color: colors.success }]}>{delivered}</Text>
          <Text style={styles.summaryLabel}>Delivered</Text>
        </View>
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrderCard order={item} />}
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
