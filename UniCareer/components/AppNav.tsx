import * as React from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/Dashboard';
import Statistica from '../screens/Statistica';
import Libretto_EsamiDati from '../screens/Libretto/Libretto_EsamiDati';
import Libretto_EsamiNonDati from '../screens/Libretto/Libretto_EsamiNonDati';

const LibrettoTopBar = createMaterialTopTabNavigator();

function Libretto() {
  return (
    <LibrettoTopBar.Navigator 
    screenOptions={({ route }) => ({
      tabBarLabel: ({ focused }) => {
        let label;
        if (route.name === 'EsamiDati') {
          label = 'Esami Conclusi';
        } else if (route.name === 'EsamiNonDati') {
          label = 'Prossimi Esami';
        }
        return <Text style={{ color: focused ? '#673ab7' : '#222' }}>{label}</Text>;
      },
      tabBarActiveTintColor: '#000000',
      tabBarInactiveTintColor: '#000000',
    })}
    >
      <LibrettoTopBar.Screen name="EsamiDati" component={Libretto_EsamiDati} />
      <LibrettoTopBar.Screen name="EsamiNonDati" component={Libretto_EsamiNonDati} />
    </LibrettoTopBar.Navigator>
  );
}


const BottomTab = createBottomTabNavigator();

export default function AppNav() {
  return (
    <BottomTab.Navigator
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
    <BottomTab.Screen name="Dashboard" component={Dashboard} options={{title:'La mia Dashboard', headerTitleAlign:'left'}}/>
    <BottomTab.Screen name="Statistica" component={Statistica} options={{title:'Le tue Statistiche', headerTitleAlign:'center'}}/>
    <BottomTab.Screen name="Libretto" component={Libretto} options={{title:'Carriera Esami', headerTitleAlign:'center'}}/>
  </BottomTab.Navigator>
  );
}