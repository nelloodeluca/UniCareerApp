import * as React from 'react';
import { PaperProvider} from 'react-native-paper';
import App from './App';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}