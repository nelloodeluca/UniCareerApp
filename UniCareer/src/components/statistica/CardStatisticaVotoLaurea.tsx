import React from 'react';
import {
  Text,
  Card,
  Title,
  Paragraph,
  ProgressBar,
  MD3Colors,
} from 'react-native-paper';
import styled from 'styled-components/native';

const Titolo = styled(Text)`
  color: white;
  font-size: 32px;
  font-weight: bold;
  textalign: center;
`;
const Voto = styled(Text)`
  color: white;
  font-size: 32px;
  textalign: center;
`;

const StyledCard = styled(Card)`
  background-color: #6854a4;
  margin: 2.5%;
  width: 95%;
  padding: 0 8px 8px 8px;
`;

type StatCardProps = {
  title: string;
  value1: number;
};

const CardStatisticaVotoLaurea: React.FC<StatCardProps> = ({
  title,
  value1,
}) => {
  return (
    <StyledCard>
      <Card.Content>
        <Titolo>{title}</Titolo>
        <Voto>{value1}/110</Voto>
      </Card.Content>
    </StyledCard>
  );
};

export default CardStatisticaVotoLaurea;
