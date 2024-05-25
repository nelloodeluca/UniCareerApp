import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import AppNav from './src/components/nav/AppNav';
import { ExamsProvider } from './src/components/EsamiContext';



export default function App() {



  return (
    <ExamsProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </GestureHandlerRootView>
    </ExamsProvider>
  );
}
