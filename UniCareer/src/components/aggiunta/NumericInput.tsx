import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

interface NumericInputProps {
  number: number;
  increment: () => void;
  decrement: () => void;
  min: number;
  max: number;
}

const NumericInput: React.FC<NumericInputProps> = ({
  number,
  increment,
  decrement,
  min,
  max,
}) => {
  return (
    <Container>
      <StyledTouchableOpacity onPress={decrement} disabled={number <= min}>
        <ButtonText>-</ButtonText>
      </StyledTouchableOpacity>
      <StyledTextInput value={number.toString()} editable={false} />
      <StyledTouchableOpacity onPress={increment} disabled={number >= max}>
        <ButtonText>+</ButtonText>
      </StyledTouchableOpacity>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2%;
`;

const StyledTextInput = styled(TextInput)`
  height: 40px;
  width: 60px;
  border-width: 0;
  margin: 0 8px;
  text-align: center;
  font-size: 24px;
  color: #6854a4;
`;

const StyledTouchableOpacity = styled(TouchableOpacity)<{ disabled: boolean }>`
  margin: 0 10px;
  padding: 4px 32px;
  background-color: ${({ disabled }) => (disabled ? '#a8a8a8' : '#6854a4')};
  border-radius: 20px;
`;

const ButtonText = styled(Text)`
  color: #fafafa;
  font-size: 20px;
`;

export default NumericInput;
