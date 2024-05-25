import React from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import styled from 'styled-components/native';
import CardStatisticaSmall from '../components/statistica/CardStatisticaSmall';
import CardStatisticaBig from '../components/statistica/CardStatisticaBig';
import CardStatisticaVotoLaurea from '../components/statistica/CardStatisticaVotoLaurea';


const StyledScrollView = styled(ScrollView)`
  flex: 1;
  padding: 10px;
`;

const CardContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)`
  margin: 10px;
  width: 45%;
`;

export default function Statistica() {
  return (
    <StyledScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <CardContainer>
        <CardStatisticaBig title="Attività Svolte:" text="Attività" value1={90} value2={180}></CardStatisticaBig>
        <CardStatisticaBig title="CFU Conseguiti: " text="CFU" value1={175} value2={180}></CardStatisticaBig>
      </CardContainer>
      <CardContainer>  
        <CardStatisticaSmall title="Voto Massimo" value= {26}></CardStatisticaSmall>
        <CardStatisticaSmall title="Voto Minimo" value= {19} ></CardStatisticaSmall>
        <CardStatisticaSmall title="Media Aritmetica" value= {19} ></CardStatisticaSmall>
        <CardStatisticaSmall title="Media Ponderata" value= {19} ></CardStatisticaSmall>
      </CardContainer>
      <CardContainer>
        <CardStatisticaVotoLaurea title="Voto di Laurea" value1={110} ></CardStatisticaVotoLaurea>
      </CardContainer>
    </StyledScrollView>
  );
}