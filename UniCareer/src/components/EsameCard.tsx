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
  flex: 1;
  padding: 0 8px 8px 8px;
`;

const InfoContainer = styled.View`
  flex: 3;
  padding: 16px 8px 8px 16px;
  justify-content: center;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
`;

const DetailText = styled(Text)`
  font-size: 14px;
  color: #666;
`;

interface VotoContainerProps {
  isPastExam: boolean;
}

const VotoContainer = styled.View<VotoContainerProps>`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => 
          props.isPastExam ? '#71d63170' : '#FB1C1C70'};
  border-radius: 0 0 50px 50px;
  margin-right: 8px;
`;

const VotoText = styled(Text)`
  font-size: 24px;
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
          <DetailText>
            Data: {esame.data} - ore {esame.ora}
          </DetailText>
          <ChipContainer>
            {esame.categorie.map((categoria, index) => (
              <Chip
                key={index}
                style={{
                  backgroundColor: categoria.colore,
                  marginRight: 4,
                  marginBottom: 4,
                }}
              >
                {categoria.nome}
              </Chip>
            ))}
          </ChipContainer>
        </InfoContainer>
        <VotoContainer isPastExam={isPastExam}>
          <VotoText>{isPastExam ? esame.voto : `${esame.CFU} CFU`}</VotoText>
        </VotoContainer>
      </CardContentContainer>
    </CardContainer>
  );
};

export default EsameCard;
