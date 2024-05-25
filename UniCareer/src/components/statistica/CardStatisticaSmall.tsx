import React from 'react';
import { Text, Card, Title, Paragraph, ProgressBar, MD3Colors } from 'react-native-paper';
import styled from 'styled-components/native';

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
  background-color: #FAFAFA; 
  margin: 2.5%;
  width: 45%;
  padding: 0 8px 8px 8px;
`;

type StatCardProps = {
    title: string;
    value: number;
};

const CardStatisticaSmall: React.FC<StatCardProps> = ({title, value}) => {
    return (
        <StyledCard>
            <Card.Content>
                <Titolo>{title}</Titolo>
                <Voto>{value}/30</Voto>
            </Card.Content>
        </StyledCard>
    );
}

export default CardStatisticaSmall;