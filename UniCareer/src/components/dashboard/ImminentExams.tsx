import React from 'react';
import { View, Text } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { Esame } from '../../types';

interface ImminentExamsProps {
  daysAhead: string;
  setDaysAhead: (days: string) => void;
  imminentExams: Esame[];
}

const ImminentExams: React.FC<ImminentExamsProps> = ({
  daysAhead,
  setDaysAhead,
  imminentExams,
}) => {
  return (
    <View>
      <Card style={{ margin: 10, padding: 10 }}>
        <DaysAheadContainer>
          <Text>Esami imminenti:</Text>
          <TextInput
            mode="outlined"
            keyboardType="numeric"
            value={daysAhead}
            onChangeText={setDaysAhead}
            style={{ marginLeft: 10, flex: 1 }}
          />
        </DaysAheadContainer>
        <ExamsTitle>Prossimi esami:</ExamsTitle>
        {imminentExams.length > 0 ? (
          imminentExams.map((exam, index) => (
            <ExamText key={index}>{`${exam.data.split('-')[2]}/${
              exam.data.split('-')[1]
            }: ${exam.nome}`}</ExamText>
          ))
        ) : (
          <Text>Nessun esame imminente</Text>
        )}
      </Card>
    </View>
  );
};

const DaysAheadContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ExamsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ExamText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;

export default ImminentExams;
