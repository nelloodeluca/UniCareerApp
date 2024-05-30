import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';
import NuovaAggiunta from '../../screens/Aggiunta/NuovaAggiunta';
import CategoriaAggiunta from '../../screens/Aggiunta/CategorieAggiunta';
import { AggiuntaNavParams } from '../../types';

/*
 * Navigazione TopTab per la schermata Aggiunta
 */

const AggiuntaTopBar = createMaterialTopTabNavigator<AggiuntaNavParams>();

function AggiuntaNav() {
  return (
    <AggiuntaTopBar.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === 'FormEsame') {
            label = 'Aggiungi Esame';
          } else if (route.name === 'FormCategorie') {
            label = 'Aggiungi Categorie';
          }
          return (
            <Text style={{ color: focused ? '#6854a4' : '#000' }}>{label}</Text>
          );
        },
        tabBarIndicatorStyle: { backgroundColor: '#6854a4' },
        tabBarPressColor: '#cccccc70',
      })}
    >
      <AggiuntaTopBar.Screen
        name="FormEsame"
        component={NuovaAggiunta}
      ></AggiuntaTopBar.Screen>
      <AggiuntaTopBar.Screen
        name="FormCategorie"
        component={CategoriaAggiunta}
      ></AggiuntaTopBar.Screen>
    </AggiuntaTopBar.Navigator>
  );
}

export default AggiuntaNav;
