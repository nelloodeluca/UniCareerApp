import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Title, Paragraph } from 'react-native-paper';
import styled from 'styled-components/native';
import CardStatisticaSmall from '../components/statistica/CardStatisticaSmall';
import CardStatisticaBig from '../components/statistica/CardStatisticaBig';
import CardStatisticaVotoLaurea from '../components/statistica/CardStatisticaVotoLaurea';
import StatisticaGrafico from '../components/statistica/GraficoAndamentoCarriera';
import ExamsContext from '../EsamiContext';

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
  const context = useContext(ExamsContext);


  if (!context) {
    // Gestisci il caso in cui il contesto non sia definito
    return <Text>Il contesto non è disponibile</Text>;
  }

  const { exams, getMaxGrade, getMinGrade,getWeightedMean,getArithmeticMean, getGraduationGrade, getExamsSummary, getGrades} = context;

  const {
    examsTaken,
    totalExams,
    obtainedCredits,
    totalCredits,
  } = getExamsSummary();


  const grades = getGrades();
  return (
    <StyledScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <CardContainer>
        <CardStatisticaBig
          title="Attività Svolte:"
          text="Attività"
          value1={examsTaken}
          value2={totalExams}
        ></CardStatisticaBig>
        <CardStatisticaBig
          title="CFU Conseguiti: "
          text="CFU"
          value1={obtainedCredits}
          value2={totalCredits}
        ></CardStatisticaBig>
      </CardContainer>
      <CardContainer>
        <CardStatisticaSmall
          title="Voto Massimo"
          value={getMaxGrade()}
        ></CardStatisticaSmall>
        <CardStatisticaSmall
          title="Voto Minimo"
          value={getMinGrade()}
        ></CardStatisticaSmall>
        <CardStatisticaSmall
          title="Media Aritmetica"
          value={getArithmeticMean()}
        ></CardStatisticaSmall>
        <CardStatisticaSmall
          title="Media Ponderata"
          value={getWeightedMean()}
        ></CardStatisticaSmall>
      </CardContainer>
      <CardContainer>
        <CardStatisticaVotoLaurea
          title="Voto di Laurea"
          value1={getGraduationGrade()}
        ></CardStatisticaVotoLaurea>
        <StatisticaGrafico grades={grades}></StatisticaGrafico>
      </CardContainer>
    </StyledScrollView>
  );
}
