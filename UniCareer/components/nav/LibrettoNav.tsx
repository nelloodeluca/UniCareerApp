import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button, SafeAreaView, Text, View } from "react-native";

import Libretto_EsamiDati from "../../screens/Libretto/Libretto_EsamiDati";
import Libretto_EsamiNonDati from "../../screens/Libretto/Libretto_EsamiNonDati";
import DettagiEsame from '../DettagiEsame';



const EsamiDatiStack = createNativeStackNavigator();

function EsamiStack() {
  return (
    <EsamiDatiStack.Navigator initialRouteName="Libretto_EsamiDati">
      
      <EsamiDatiStack.Screen name="Libretto_EsamiDati" component={Libretto_EsamiDati} />
      <EsamiDatiStack.Screen name="EsameDettagli" component={DettagiEsame} options={{ presentation: 'modal' }}/>
    </EsamiDatiStack.Navigator>
  );
}


/*
 * Navigazione TopBar Presente in Libretto
 */
const LibrettoTopBar = createMaterialTopTabNavigator();

function Libretto() {
  return (
    <LibrettoTopBar.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          let label;
          if (route.name === "EsamiDati") {
            label = "Esami Conclusi";
          } else if (route.name === "EsamiNonDati") {
            label = "Prossimi Esami";
          }
          return (
            <Text style={{ color: focused ? "#3855F5" : "#000" }}>{label}</Text>
          );
        },
      })}
    >
      <LibrettoTopBar.Screen name="EsamiDati" component={EsamiStack} />
      <LibrettoTopBar.Screen name="EsamiNonDati" component={Libretto_EsamiNonDati} />
    </LibrettoTopBar.Navigator>
  );
}

export default Libretto;
