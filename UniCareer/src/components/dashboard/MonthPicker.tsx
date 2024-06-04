import React from 'react';
import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native';

interface MonthPickerProps {
  months: string[];
  selectedMonth: number;
  handleMonthChange: (month: number) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({
  months,
  selectedMonth,
  handleMonthChange,
}) => {
  return (
    <PickerContainer>
      <Picker selectedValue={selectedMonth} onValueChange={handleMonthChange}>
        {months.map((month, index) => (
          <Picker.Item key={index} label={month} value={index} />
        ))}
      </Picker>
    </PickerContainer>
  );
};

const PickerContainer = styled.View`
  margin: 0 10px;
`;

export default MonthPicker;
