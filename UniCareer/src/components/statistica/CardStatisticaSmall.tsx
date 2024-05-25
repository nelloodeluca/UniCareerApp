import React from 'react';
import { Dimensions } from 'react-native';
import {
  Text,
  Card,
  Title,
  Paragraph,
  ProgressBar,
  MD3Colors,
} from 'react-native-paper';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const Titolo = styled(Text)`
  font-size: 18px;
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
  margin: 10px auto;
  width: 45%;
  padding: ${width > 640 ? '0 8px 8px 8px' : '0 4px 4px 4px'};
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
