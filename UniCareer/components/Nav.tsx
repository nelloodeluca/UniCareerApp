import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import Statistica from '../screens/Statistica';
import Libretto from '../screens/Libretto';


const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused
            ? 'home-sharp'
            : 'home-outline';
        } else if (route.name === 'Statistica') {
          iconName = focused ? 'stats-chart-sharp' : 'stats-chart-outline';
        } else if (route.name === 'Libretto') {
          iconName = focused ? 'list-circle-sharp' : 'list-circle-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Dashboard" component={Dashboard} options={{}}/>
    <Tab.Screen name="Statistica" component={Statistica} />
    <Tab.Screen name="Libretto" component={Libretto} />
  </Tab.Navigator>
  );
}