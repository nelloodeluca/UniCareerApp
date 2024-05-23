import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

interface Esame {
  id: string;
  nome: string;
  cfu: number;
  data: string;
  categoria: string;
}

interface DettagliEsameProps {
  route: RouteProp<{ params: { esame: Esame } }, 'params'>;
  navigation: NativeStackNavigationProp<any>;
}

const DettagliEsame: React.FC<DettagliEsameProps> = ({ route, navigation }) => {
  const { esame } = route.params;

  return (
    <View className="flex-1 items-center justify-center p-5">
      <Text className="text-2xl font-bold mb-5">{esame.nome}</Text>
      <Text>CFU: {esame.cfu}</Text>
      <Text>Data: {esame.data}</Text>
      <Text>Categoria: {esame.categoria === 'colorato' ? 'Colorato' : 'Vuoto'}</Text>
      <Button title="Torna indietro" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DettagliEsame;