import React from 'react';
import { Text, Card } from 'react-native-paper';
import styled from 'styled-components/native';

const Titolo = styled(Text)`
  color: #fafafa;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
`;
const Voto = styled(Text)`
  color: #fafafa;
  font-weight: 500;
  font-size: 28px;
  text-align: center;
`;

const StyledCard = styled(Card)`
  background-color: #6854a4;
  margin: 4px auto 16px auto;
  width: 100%;
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
