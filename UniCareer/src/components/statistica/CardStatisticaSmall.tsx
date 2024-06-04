import React from 'react';
import {
  Text,
  Card,
  Paragraph
} from 'react-native-paper';
import styled from 'styled-components/native';

const Titolo = styled(Text)`
  font-size: 17px;
  font-weight: bold;
  text-align: center;
`;

const Voto = styled(Paragraph)`
  font-size: 16px;
  text-align: center;
  margin: 10px 0 0 0;
`;

const StyledCard = styled(Card)`
  background-color: #fafafa;
    margin: 8px auto;
    flex:1;
    
`;

type StatCardProps = {
  title: string;
  value: number;
};

const CardStatisticaSmall: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <StyledCard>
      <Card.Content>
        <Titolo>{title}</Titolo>
        <Voto>{value}/30</Voto>
      </Card.Content>
    </StyledCard>
  );
};

export default CardStatisticaSmall;
