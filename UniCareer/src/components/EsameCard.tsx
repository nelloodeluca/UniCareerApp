// EsameCard.tsx
import React from 'react';
import { Card, Text, Chip } from 'react-native-paper';
import styled from 'styled-components/native';
import { Esame } from '../types';

const CardContainer = styled(Card)`
    margin: 8px;
    background: #fafafa;
`;

const CardContentContainer = styled(Card.Content)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const InfoContainer = styled.View`
    flex: 1;
    margin-right: 16px;
`;

const Title = styled(Text)`
    font-size: 18px;
    font-weight: bold;
`;

const DetailText = styled(Text)`
    font-size: 14px;
    color: #666;
`;

const VotoContainer = styled.View`
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 30px; 
    background-color: #ccc;
`;

const VotoText = styled(Text)`
    font-size: 18px;
    font-weight: bold;
    color: #000;
    text-align: center;
`;

const ChipContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 8px;
`;

type Props = {
  esame: Esame;
};

const EsameCard: React.FC<Props> = ({ esame }) => {
  if (!esame) {
    return null;
  }

  const currentDate = new Date();
  const esameDate = new Date(esame.data);
  const isPastExam = esameDate < currentDate;

  return (
    <CardContainer>
      <CardContentContainer>
        <InfoContainer>
          <Title>{esame.nome}</Title>
          <DetailText>{esame.data}</DetailText>
          <ChipContainer>
            {esame.categorie.map((categoria, index) => (
              <Chip key={index} style={{ backgroundColor: categoria.colore, marginRight: 4, marginBottom: 4 }}>
                {categoria.nome}
              </Chip>
            ))}
          </ChipContainer>
        </InfoContainer>
        <VotoContainer>
          <VotoText>{isPastExam ? esame.voto : `${esame.CFU} CFU`}</VotoText>
        </VotoContainer>
      </CardContentContainer>
    </CardContainer>
  );
};

export default EsameCard;