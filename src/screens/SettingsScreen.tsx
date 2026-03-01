import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useStore } from '../store';
import { colors, spacing, borderRadius, shadows } from '../lib/theme';

export function SettingsScreen() {
  const { user, logout } = useStore();
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.full_name?.charAt(0).toUpperCase() || 'A'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.full_name || 'Admin User'}</Text>
        <Text style={styles.email}>{user?.email || 'admin@fleetflow.com'}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{user?.role || 'admin'}</Text>
        </View>
      </View>
      
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>Profile Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🔔</Text>
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🚚</Text>
          <Text style={styles.menuText}>Fleet Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>📊</Text>
          <Text style={styles.menuText}>Reports & Analytics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>⚙️</Text>
          <Text style={styles.menuText}>App Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>❓</Text>
          <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout}>
          <Text style={styles.menuIcon}>🚪</Text>
          <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.version}>FleetFlow v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  profile: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.surface,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  email: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  roleBadge: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.accent + '20',
    borderRadius: borderRadius.full,
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.accent,
    textTransform: 'capitalize',
  },
  menu: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    ...shadows.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  menuText: {
    fontSize: 16,
    color: colors.text,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: colors.danger,
  },
  version: {
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.textSecondary,
    fontSize: 12,
  },
});
