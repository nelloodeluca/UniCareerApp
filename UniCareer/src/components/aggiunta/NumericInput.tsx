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

const NumericInput: React.FC<NumericInputProps> = ({ number, increment, decrement, min, max }) => {
  return (
    <Container>
      <StyledTouchableOpacity onPress={decrement} disabled={number <= min}>
        <ButtonText>-</ButtonText>
      </StyledTouchableOpacity>
      <StyledTextInput
        value={number.toString()}
        editable={false} // Rendi il campo non modificabile dall'utente
      />
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
    padding: 20px;
`;

const StyledTextInput = styled(TextInput)`
    height: 40px;
    width: 60px;
    border-color: gray;
    border-width: 1px;
    margin: 0 10px;
    text-align: center;
    font-size: 18px;
`;

const StyledTouchableOpacity = styled(TouchableOpacity)<{ disabled: boolean }>`
    margin: 0 10px;
    padding: 10px;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#6854a4')};
    border-radius: 5px;
`;

const ButtonText = styled(Text)`
    color: white;
    font-size: 18px;
`;

export default NumericInput;
