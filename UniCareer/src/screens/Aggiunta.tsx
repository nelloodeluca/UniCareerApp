import React from 'react';
import { ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import FormAggiunta from '../components/FormAggiunta';
import { RootStackParamList } from '../types'; // Assicurati che il percorso sia corretto

type AggiuntaRouteProp = RouteProp<RootStackParamList, 'Aggiunta'>;

function Aggiunta() {
  const route = useRoute<AggiuntaRouteProp>();
  const esame = route.params?.esame;

  return (
    <ScrollView>
      <FormAggiunta esame={esame} />
    </ScrollView>
  );
}

export default Aggiunta;
