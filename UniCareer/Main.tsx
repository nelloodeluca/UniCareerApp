import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';

console.log("Main component loaded");

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
