import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Button, SafeAreaView, Text, View } from "react-native";

import Libretto_EsamiDati from "../../screens/Libretto/Libretto_EsamiDati";
import Libretto_EsamiNonDati from "../../screens/Libretto/Libretto_EsamiNonDati";
import DettagiEsame from "../DettagiEsame";

const Stack = createNativeStackNavigator();

function EsamiDatiStack() {
  return (
    <Stack.Navigator initialRouteName="Libretto_EsamiDati" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Libretto_EsamiDati" component={Libretto_EsamiDati} />
      <Stack.Screen name="EsameDettagli" component={DettagiEsame} options={{ presentation: "modal", title:'aa' }} />
    </Stack.Navigator>
  );
}

function EsamiNonDatiStack() {
  return (
    <Stack.Navigator initialRouteName="Libretto_EsamiNonDati" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Libretto_EsamiNonDati" component={Libretto_EsamiNonDati} />
      <Stack.Screen name="EsameDettagli" component={DettagiEsame} options={{ presentation: "modal" }} />
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
      <LibrettoTopBar.Screen name="EsamiDati" component={EsamiDatiStack} />
      <LibrettoTopBar.Screen
        name="EsamiNonDati"
        component={EsamiNonDatiStack}
      />
    </LibrettoTopBar.Navigator>
  );
}

export default Libretto;
