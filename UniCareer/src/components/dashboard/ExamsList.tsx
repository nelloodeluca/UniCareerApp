import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { Esame } from '../../types';

interface ExamsListProps {
  title: string;
  exams: Esame[];
  selectedWeekIndex?: number;
  weeks?: { start: string; end: string }[];
  setSelectedWeekIndex?: (index: number) => void;
}

const ExamsList: React.FC<ExamsListProps> = ({
                                               title,
                                               exams,
                                               selectedWeekIndex,
                                               weeks,
                                               setSelectedWeekIndex,
                                             }) => {
  return (
    <View>
      <Card style={{ margin: 10, padding: 10 }}>
        <ExamsTitle>{title}</ExamsTitle>
        {selectedWeekIndex !== undefined && weeks && setSelectedWeekIndex && (
          <Picker
            selectedValue={selectedWeekIndex}
            onValueChange={(itemValue: number) => setSelectedWeekIndex(itemValue)}
          >
            {weeks.map((week, index) => (
              <Picker.Item
                key={index}
                label={`Settimana ${index + 1}: ${week.start.split('-')[2]}/${week.start.split('-')[1]} - ${week.end.split('-')[2]}/${week.end.split('-')[1]}`}
                value={index}
              />
            ))}
          </Picker>
        )}
        {exams.length > 0 ? (
          exams.map((exam, index) => (
            <ExamText key={index}>{`${exam.data.split('-')[2]}/${exam.data.split('-')[1]}: ${exam.nome}`}</ExamText>
          ))
        ) : (
          <Text>Nessun esame</Text>
        )}
      </Card>
    </View>
  );
};

const ExamsTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const ExamText = styled.Text`
    font-size: 16px;
    margin-top: 5px;
`;

export default ExamsList;
