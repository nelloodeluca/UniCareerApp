import React from 'react';
import { Text, Card, Title, Paragraph, ProgressBar, MD3Colors } from 'react-native-paper';
import styled from 'styled-components/native';
import { View, StyleSheet } from 'react-native';

const Titolo = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  textAlign: center;
`;

const Voto = styled(Paragraph)`
  font-size: 16px;
  textAlign: center;
`;

const Barra = styled(ProgressBar)`
    height: 100%;
    //margin: 10px 0 0 0;
    background-color: #d6c9ff;
`;

const StyledCard = styled(Card)`
  background-color: #FAFAFA;
  margin: 2.5%;
  width: 95%;
  padding: 0 8px 8px 8px;
`;

const ProgressBarContainer = styled(View)`
  position: relative;
  height: 20px;
  margin: 10px 0;
  justify-content: center;
`;

const ProgressText = styled(Text)`
  position: absolute;
  font-weight: bold;
  width: 100%;
  text-align: center;
  color: #d6c9ff;
  font-size: 12px;
  z-index: 1; 
`;

type StatCardProps = {
    title: string;
    text:string;
    value1: number;
    value2: number;
};



const CardStatisticaBig: React.FC<StatCardProps> = ({title, text, value1, value2}) => {

    const rapporto = value1/value2;

    return (
        <StyledCard>
            <Card.Content>
                <Titolo>{title} {value1}/{value2} {text}</Titolo>
                <ProgressBarContainer>
                    <Barra progress={rapporto} color={"#6854a4"} /*style={{/*width: `${rapporto * 50}%` }}*//>
                    <ProgressText>{`${Math.round(rapporto * 100)}%`}</ProgressText>
                </ProgressBarContainer>
            </Card.Content>
        </StyledCard>
    );
}

export default CardStatisticaBig;