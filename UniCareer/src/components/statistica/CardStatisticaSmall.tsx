import React from 'react';
import { Text, Card, Title, Paragraph, ProgressBar, MD3Colors } from 'react-native-paper';
import styled from 'styled-components/native';

const Titolo = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  textAlign: center;
`;

const Voto = styled(Paragraph)`
  font-size: 16px;
  textAlign: center;
  margin: 10px 0 0 0;
`;

const StyledCard = styled(Card)`
  background-color: #FAFAFA; 
  margin: 10px;
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