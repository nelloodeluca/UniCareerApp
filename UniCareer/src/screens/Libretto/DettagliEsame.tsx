import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { DettagliEsameProps } from '../../types'; // Assicurati che il percorso sia corretto

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InfoText = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
`;

const DettagliEsame: React.FC<DettagliEsameProps> = ({ route, navigation }) => {
  const { esame } = route.params;

  return (
    <Container>
      <Title>{esame.nome}</Title>
      <InfoText>CFU: {esame.cfu}</InfoText>
      <InfoText>Data: {esame.data}</InfoText>
      <InfoText>
        Categoria: {esame.categoria === 'colorato' ? 'Colorato' : 'Vuoto'}
      </InfoText>
      <Button title="Torna indietro" onPress={() => navigation.goBack()} />
    </Container>
  );
};

export default DettagliEsame;
