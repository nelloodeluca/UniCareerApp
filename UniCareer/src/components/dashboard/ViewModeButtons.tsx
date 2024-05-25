import React from 'react';
import { View } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import styled from 'styled-components/native';

interface ViewModeButtonsProps {
  viewMode: 'monthly' | 'weekly';
  handleViewModeChange: (mode: 'monthly' | 'weekly') => void;
}

const ViewModeButtons: React.FC<ViewModeButtonsProps> = ({
  viewMode,
  handleViewModeChange,
}) => {
  return (
    <ButtonsContainer>
      <PaperButton
        mode={viewMode === 'monthly' ? 'contained' : 'outlined'}
        onPress={() => handleViewModeChange('monthly')}
        style={{ marginHorizontal: 5 }}
      >
        Mensile 📅
      </PaperButton>
      <PaperButton
        mode={viewMode === 'weekly' ? 'contained' : 'outlined'}
        onPress={() => handleViewModeChange('weekly')}
        style={{ marginHorizontal: 5 }}
      >
        Settimanale 📆
      </PaperButton>
    </ButtonsContainer>
  );
};

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-vertical: 15px;
`;

export default ViewModeButtons;
