import React from 'react';
import { View, TextInput, Button } from 'react-native';
import styled from 'styled-components/native';

interface NumericInputProps {
  number: number;
  increment: () => void;
  decrement: () => void;
}

const NumericInput: React.FC<NumericInputProps> = ({ number, increment, decrement }) => {
  return (
    <Container>
      <StyledButton title="-" onPress={decrement} />
      <StyledTextInput
        value={number.toString()}
        editable={false} // Rendi il campo non modificabile dall'utente
      />
      <StyledButton title="+" onPress={increment} />
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

const StyledButton = styled(Button)`
    margin: 0 10px;
`;

export default NumericInput;
