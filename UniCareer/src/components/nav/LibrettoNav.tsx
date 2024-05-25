import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Text } from 'react-native';
import CarrieraEsami from '../../screens/Libretto/CarrieraEsami';

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
          return (
            <Text style={{ color: focused ? '#6854a4' : '#000' }}>{label}</Text>
          );
        },
      })}
    >
      <LibrettoTopBar.Screen name="EsamiDati">
        {() => <CarrieraEsami showVoto={true} />}
      </LibrettoTopBar.Screen>
      <LibrettoTopBar.Screen name="EsamiNonDati">
        {() => <CarrieraEsami showVoto={false} />}
      </LibrettoTopBar.Screen>
    </LibrettoTopBar.Navigator>
  );
}

export default Libretto;
