import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button, SafeAreaView, Text, View } from "react-native";

import Libretto_EsamiDati from "../../screens/Libretto/Libretto_EsamiDati";
import Libretto_EsamiNonDati from "../../screens/Libretto/Libretto_EsamiNonDati";
import DettagiEsame from '../DettagiEsame';



const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Libretto_EsamiDati">
        <Stack.Screen name="Libretto_EsamiDati" component={Libretto_EsamiDati} />
        <Stack.Screen name="EsameDettagli" component={DettagiEsame} />
      </Stack.Navigator>
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
      <LibrettoTopBar.Screen name="EsamiDati" component={Libretto_EsamiDati} />
      <LibrettoTopBar.Screen
        name="EsamiNonDati"
        component={Libretto_EsamiNonDati}
      />
    </LibrettoTopBar.Navigator>
  );
}

export default Libretto;

function createStackNavigator() {
    throw new Error("Function not implemented.");
}
