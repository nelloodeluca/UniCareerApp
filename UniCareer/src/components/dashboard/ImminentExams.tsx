import React from 'react';
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
    <Container>
      <StyledCard>
        <DaysAheadContainer>
          <LabelText>Esami imminenti:</LabelText>
          <StyledTextInput
            mode="outlined"
            keyboardType="numeric"
            value={daysAhead}
            onChangeText={setDaysAhead}
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
          <NoExamText>Nessun esame imminente</NoExamText>
        )}
      </StyledCard>
    </Container>
  );
};

const Container = styled.View`
  padding: 4px;
`;

const StyledCard = styled(Card)`
  background-color: #fafafa;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  elevation: 3;
`;

const DaysAheadContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const LabelText = styled.Text`
  font-size: 16px;
  color: #333;
`;

const StyledTextInput = styled(TextInput)`
  margin-left: 10px;
  flex: 1;
`;

const ExamsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const ExamText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: #555;
`;

const NoExamText = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 10px;
`;

export default ImminentExams;
