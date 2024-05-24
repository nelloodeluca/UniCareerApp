import React from 'react';
import { FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import EsameCard from '../../components/EsameCard';

interface Esame {
  id: string;
  nome: string;
  cfu: number;
  data: string;
  categoria: string;
}

const esami: Esame[] = [
  {
    id: '1',
    nome: 'Reti di Calcolatori',
    cfu: 9,
    data: '2024-06-15',
    categoria: 'colorato',
  },
  { id: '2', nome: 'Fisica', cfu: 8, data: '2024-07-20', categoria: 'vuoto' },
  {
    id: '3',
    nome: 'Analisi 1',
    cfu: 8,
    data: '2024-07-20',
    categoria: 'vuoto',
  },
  // Aggiungi altri esami qui
];

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

const TouchableOpacityStyled = styled.TouchableOpacity`
  margin-bottom: 16px;
`;

function Libretto_EsamiNonDati() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Container>
      <FlatList
        data={esami}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacityStyled
            onPress={() =>
              navigation.navigate('EsameDettagli', { esame: item })
            }
          >
            <EsameCard item={item} />
          </TouchableOpacityStyled>
        )}
      />
    </Container>
  );
}

export default Libretto_EsamiNonDati;
