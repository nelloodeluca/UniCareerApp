import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../../screens/Dashboard';
import Statistica from '../../screens/Statistica';
import AggiuntaNav from './AggiuntaNav';
import LibrettoNav from './LibrettoNav';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

/*
 * Navigazione BottomTab per l'intera App
 */

const BottomTab = createBottomTabNavigator<RootStackParamList>();

export default function AppNav() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'Statistica') {
            iconName = focused ? 'stats-chart-sharp' : 'stats-chart-outline';
          } else if (route.name === 'Libretto') {
            iconName = focused ? 'list-circle-sharp' : 'list-circle-outline';
          } else if (route.name === 'Aggiunta') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#7e7e7e',
      })}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ title: 'La mia Dashboard', headerTitleAlign: 'left' }}
      />
      <BottomTab.Screen
        name="Statistica"
        component={Statistica}
        options={{ title: 'Le tue Statistiche', headerTitleAlign: 'center' }}
      />
      <BottomTab.Screen
        name="Libretto"
        component={LibrettoNav}
        options={{ title: 'Carriera Esami', headerTitleAlign: 'center' }}
      />
      <BottomTab.Screen
        name="Aggiunta"
        component={AggiuntaNav}
        options={{
          title: 'Aggiungi Informazioni',
          headerTitleAlign: 'center',
          headerShown: true,
        }}
      />
    </BottomTab.Navigator>
  );
}
