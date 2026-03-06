import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';

// Simple map visualization for web - shows vehicles on a grid
export function VehicleMap() {
  const { vehicles } = useStore();
  
  // Johannesburg area coordinates
  const centerLat = -26.2041;
  const centerLng = 28.0473;
  
  const getPosition = (lat?: number, lng?: number) => {
    if (!lat || !lng) return { left: 50, top: 50 };
    const left = 50 + ((lng - centerLng) * 100);
    const top = 50 + ((centerLat - lat) * 100);
    return {
      left: Math.max(10, Math.min(90, left)),
      top: Math.max(10, Math.min(90, top))
    };
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return colors.success;
      case 'idle': return colors.warning;
      case 'maintenance': return colors.danger;
      default: return colors.textSecondary;
    }
  };
  
  return (
    <View style={styles.mapContainer}>
      <View style={styles.map}>
        <Text style={styles.mapLabel}>📍 Fleet Locations - Johannesburg Area</Text>
        
        {/* Grid lines */}
        <View style={styles.gridLineH1} />
        <View style={styles.gridLineH2} />
        <View style={styles.gridLineV1} />
        <View style={styles.gridLineV2} />
        
        {/* Center marker */}
        <View style={[styles.marker, { left: 50, top: 50, backgroundColor: colors.primary }]}>
          <Text style={styles.markerText}>🏢</Text>
        </View>
        
        {/* Vehicle markers */}
        {vehicles.filter(v => v.current_lat && v.current_lng).map((vehicle) => {
          const pos = getPosition(vehicle.current_lat, vehicle.current_lng);
          return (
            <View 
              key={vehicle.id}
              style={[
                styles.marker, 
                { 
                  left: pos.left, 
                  top: pos.top, 
                  backgroundColor: getStatusColor(vehicle.status) 
                }
              ]}
            >
              <Text style={styles.markerText}>🚚</Text>
            </View>
          );
        })}
      </View>
      
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
          <Text style={styles.legendText}>Active</Text>
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
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    marginTop: spacing.md,
  },
  map: {
    height: 200,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    position: 'relative',
    overflow: 'hidden',
    ...shadows.card,
  },
  mapLabel: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    fontSize: 12,
    color: colors.textSecondary,
    zIndex: 10,
  },
  gridLineH1: {
    position: 'absolute',
    top: '33%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
  },
  gridLineH2: {
    position: 'absolute',
    top: '66%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border,
  },
  gridLineV1: {
    position: 'absolute',
    left: '33%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: colors.border,
  },
  gridLineV2: {
    position: 'absolute',
    left: '66%',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: colors.border,
  },
  marker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    borderWidth: 2,
    borderColor: colors.surface,
    ...shadows.card,
  },
  markerText: {
    fontSize: 14,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
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
