import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useStore } from '../store';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';

export function WarehouseScreen() {
  const { inventory } = useStore();
  
  const lowStock = inventory.filter(i => i.quantity < i.min_quantity).length;
  const totalItems = inventory.length;
  
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={[styles.summaryItem, { backgroundColor: colors.warning + '20' }]}>
          <Text style={[styles.summaryValue, { color: colors.warning }]}>{lowStock}</Text>
          <Text style={styles.summaryLabel}>Low Stock</Text>
        </View>
        <View style={[styles.summaryItem, { backgroundColor: colors.success + '20' }]}>
          <Text style={[styles.summaryValue, { color: colors.success }]}>{totalItems - lowStock}</Text>
          <Text style={styles.summaryLabel}>In Stock</Text>
        </View>
      </View>
      
      <FlatList
        data={inventory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const isLow = item.quantity < item.min_quantity;
          return (
            <View style={[styles.itemCard, isLow && styles.lowStockCard]}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemName}>{item.name}</Text>
                {isLow && <Text style={styles.alertBadge}>⚠️ LOW</Text>}
              </View>
              <Text style={styles.itemSku}>SKU: {item.sku}</Text>
              <View style={styles.itemDetails}>
                <View>
                  <Text style={styles.itemLabel}>Quantity</Text>
                  <Text style={[styles.itemValue, isLow && { color: colors.danger }]}>{item.quantity}</Text>
                </View>
                <View>
                  <Text style={styles.itemLabel}>Min Required</Text>
                  <Text style={styles.itemValue}>{item.min_quantity}</Text>
                </View>
                <View>
                  <Text style={styles.itemLabel}>Location</Text>
                  <Text style={styles.itemValue}>{item.location}</Text>
                </View>
              </View>
            </View>
          );
        }}
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
  itemCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.card,
  },
  lowStockCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  alertBadge: {
    fontSize: 10,
    color: colors.danger,
    fontWeight: '600',
  },
  itemSku: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
