import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { Esame } from '../../types';

interface TodayExamsProps {
  todayExams: Esame[];
}

const TodayExams: React.FC<TodayExamsProps> = ({ todayExams }) => {
  return (
    <View>
      <TodayExamsCard
        style={{ margin: 10, padding: 10, backgroundColor: '#dff0d8' }}
      >
        <TodayExamsTitle>Esami di oggi:</TodayExamsTitle>
        {todayExams.map((exam, index) => (
          <TodayExamText key={index}>{exam.nome}</TodayExamText>
        ))}
        <EncouragementText>
          Buona fortuna per i tuoi esami di oggi! 🍀
        </EncouragementText>
        <InspirationalQuoteContainer>
          <InspirationalQuote>
            "Il successo non è la chiave della felicità. La felicità è la chiave
            del successo. Se ami ciò che fai, avrai successo. 🌟"
          </InspirationalQuote>
        </InspirationalQuoteContainer>
      </TodayExamsCard>
    </View>
  );
};

const TodayExamsCard = styled(Card)`
  align-items: center;
`;

const TodayExamsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
`;

const TodayExamText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: #34495e;
  text-align: center;
`;

const EncouragementText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  color: #27ae60;
  text-align: center;
`;

const InspirationalQuoteContainer = styled.View`
  margin-top: 20px;
  padding-horizontal: 20px;
`;

const InspirationalQuote = styled.Text`
  font-size: 16px;
  font-style: italic;
  text-align: center;
  color: #7f8c8d;
`;

export default TodayExams;
