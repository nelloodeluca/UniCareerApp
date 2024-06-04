import React from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { Esame } from '../../types';

interface ExamsListProps {
  title: string;
  esami: Esame[];
  selectedWeekIndex?: number;
  weeks?: { start: string; end: string }[];
  setSelectedWeekIndex?: (index: number) => void;
}

const ExamsList: React.FC<ExamsListProps> = ({
  title,
  esami,
  selectedWeekIndex,
  weeks,
  setSelectedWeekIndex,
}) => {
  return (
    <Container>
      <StyledCard>
        <ExamsTitle>{title}</ExamsTitle>
        {selectedWeekIndex !== undefined && weeks && setSelectedWeekIndex && (
          <PickerContainer>
            <Picker
              selectedValue={selectedWeekIndex}
              onValueChange={(itemValue: number) =>
                setSelectedWeekIndex(itemValue)
              }
            >
              {weeks.map((week, index) => (
                <Picker.Item
                  key={index}
                  label={`Settimana ${index + 1}: ${week.start.split('-')[2]}/${
                    week.start.split('-')[1]
                  } - ${week.end.split('-')[2]}/${week.end.split('-')[1]}`}
                  value={index}
                />
              ))}
            </Picker>
          </PickerContainer>
        )}
        {esami.length > 0 ? (
          esami.map((exam, index) => (
            <ExamText key={index}>{`${exam.data.split('-')[2]}/${
              exam.data.split('-')[1]
            }: ${exam.nome}`}</ExamText>
          ))
        ) : (
          <NoExamText>Nessun esame</NoExamText>
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

const ExamsTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const PickerContainer = styled.View`
  margin-bottom: 10px;
`;

const ExamText = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: #555;
`;

const NoExamText = styled(Text)`
  font-size: 16px;
  color: #999;
  text-align: center;
  margin-top: 10px;
`;

export default ExamsList;
