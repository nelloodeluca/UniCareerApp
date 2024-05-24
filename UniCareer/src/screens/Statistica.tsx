import { View, Text } from 'react-native';
import RettangoloTesto from '../components/RettangoloTesto';
import RettDatoSingolo from '../components/RettDatoSingolo';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

export default function Statistica() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
      }}
    >
      <RettDatoSingolo a="Il Voto Massimo è" b="126"></RettDatoSingolo>
      <RettDatoSingolo a="Il Voto Minimo è" b="140"></RettDatoSingolo>
      <RettangoloTesto a="CFU conseguiti" b="192" c="204"></RettangoloTesto>
      <RettangoloTesto a="Esami Dati" b="496" c="972"></RettangoloTesto>
      <RettDatoSingolo a="Media Aritmetica" b="18"></RettDatoSingolo>
      <RettDatoSingolo a="Media Ponderata" b="18"></RettDatoSingolo>
      <RettDatoSingolo a="Voto di Laurea" b="60"></RettDatoSingolo>
    </SafeAreaView>
  );
}
