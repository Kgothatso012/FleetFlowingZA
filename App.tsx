import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';

import { DashboardScreen } from './src/screens/DashboardScreen';
import { FleetScreen } from './src/screens/FleetScreen';
import { OrdersScreen } from './src/screens/OrdersScreen';
import { WarehouseScreen } from './src/screens/WarehouseScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { colors } from './src/lib/theme';

const Tab = createBottomTabNavigator();

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <View style={[styles.iconContainer, focused && styles.iconFocused]}>
      <Text style={[styles.icon, focused && styles.iconFocusedText]}>{icon}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.surface,
          headerTitleStyle: { fontWeight: '700' },
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            headerTitle: 'FleetFlow',
            tabBarIcon: ({ focused }) => <TabIcon icon="📊" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Fleet"
          component={FleetScreen}
          options={{
            headerTitle: 'Fleet Management',
            tabBarIcon: ({ focused }) => <TabIcon icon="🚚" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            headerTitle: 'Orders',
            tabBarIcon: ({ focused }) => <TabIcon icon="📦" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Warehouse"
          component={WarehouseScreen}
          options={{
            headerTitle: 'Warehouse',
            tabBarIcon: ({ focused }) => <TabIcon icon="🏭" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTitle: 'Settings',
            tabBarIcon: ({ focused }) => <TabIcon icon="⚙️" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 4,
    borderRadius: 8,
  },
  iconFocused: {
    backgroundColor: colors.primary + '20',
  },
  icon: {
    fontSize: 20,
  },
  iconFocusedText: {
    transform: [{ scale: 1.1 }],
  },
});
