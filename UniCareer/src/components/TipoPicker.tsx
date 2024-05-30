import React from 'react';
import { Button as PaperButton } from 'react-native-paper';
import styled from 'styled-components/native';

interface ToggleButtonGroupProps {
  option1: string;
  option2: string;
  selectedOption: string;
  handleOptionChange: (option: string) => void;
}

const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
                                                               option1,
                                                               option2,
                                                               selectedOption,
                                                               handleOptionChange,
                                                             }) => {
  return (
    <ButtonsContainer>
      <StyledButton
        mode={selectedOption === option1 ? 'contained' : 'outlined'}
        onPress={() => handleOptionChange(option1)}
      >
        {option1}
      </StyledButton>
      <StyledButton
        mode={selectedOption === option2 ? 'contained' : 'outlined'}
        onPress={() => handleOptionChange(option2)}
      >
        {option2}
      </StyledButton>
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin: 8px 0;
`;

const StyledButton = styled(PaperButton)`
    flex: 1;
    margin: 0 4px;
    font-size: 16px;
`;

export default ToggleButtonGroup;
