import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import AppNav from './src/components/nav/AppNav';
import { prepareDB } from './src/utils/databaseSetup';


SQLite.enablePromise(true);

const dbPromise = SQLite.openDatabase({
  name: 'gruppo13.db',
  location: 'default',
});

export default function App() {
  React.useEffect(() => {
    prepareDB();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
