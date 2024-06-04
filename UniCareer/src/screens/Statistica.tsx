import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Card, Paragraph } from 'react-native-paper';
import styled from 'styled-components/native';
import CardStatisticaSmall from '../components/statistica/CardStatisticaSmall';
import CardStatisticaBig from '../components/statistica/CardStatisticaBig';
import CardStatisticaVotoLaurea from '../components/statistica/CardStatisticaVotoLaurea';
import StatisticaGrafico from '../components/statistica/GraficoAndamentoCarriera';
import ExamsContext from '../EsamiContext';
import { MaterialIcons } from '@expo/vector-icons';

const StyledScrollView = styled(ScrollView)`
  flex: 1;
  padding: 10px;
  margin-bottom: 16px;
  background-color: #f0f4f8;
`;

const CardContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
    gap: 8px;
`;

const Label = styled(Paragraph)`
  font-weight: 600;
  margin-top: 10px;
  font-size: 20px;
  text-align: center;
`;

const EmptyContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 10px;
  elevation: 5;
`;

const IconWrapper = styled(View)`
  background-color: #e0e7ef;
  border-radius: 50px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
    width: 100%;
    margin: 4px auto;
  background-color: #fafafa;
`;

export default function Statistica() {
  const context = useContext(ExamsContext);

  if (!context) {
    return <Text>Il contesto non è disponibile</Text>;
  }

  const {
    exams,
    getMaxGrade,
    getMinGrade,
    getWeightedMean,
    getArithmeticMean,
    getGraduationGrade,
    getExamsSummary,
    getGrades,
  } = context;

  const { examsTaken, totalExams, obtainedCredits, totalCredits } =
    getExamsSummary();

  const grades = getGrades();

  if (examsTaken < 5) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          padding: '5%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <EmptyContainer>
          <IconWrapper>
            <MaterialIcons name="error-outline" size={56} color="#6854a4" />
          </IconWrapper>
          <Label>
            Aggiungi almeno 5 Esami Conclusi per visualizzare le tue
            statistiche!
          </Label>
        </EmptyContainer>
      </View>
    );
  }

  return (
    <StyledScrollView>
        <CardStatisticaBig
          title="Attività Svolte"
          text="Attività Svolte"
          value1={examsTaken}
          value2={totalExams}
        />
        <CardStatisticaBig
          title="CFU Conseguiti: "
          text="CFU Conseguiti"
          value1={obtainedCredits}
          value2={totalCredits}
        />
      <CardContainer>
        <CardStatisticaSmall title="Voto Massimo" value={getMaxGrade()} />
        <CardStatisticaSmall title="Voto Minimo" value={getMinGrade()} />
      </CardContainer>

      <StyledCard>
        <Card.Content>
          <Label>Grafico Libretto Esami</Label>
        </Card.Content>
        <StatisticaGrafico grades={grades} />
      </StyledCard>


      <CardContainer>
        <CardStatisticaSmall
          title="Media Aritmetica"
          value={getArithmeticMean()}
        />
        <CardStatisticaSmall
          title="Media Ponderata"
          value={getWeightedMean()}
        />
      </CardContainer>
        <CardStatisticaVotoLaurea
          title="Voto di Laurea"
          value1={getGraduationGrade()}
        />
    </StyledScrollView>
  );
}
