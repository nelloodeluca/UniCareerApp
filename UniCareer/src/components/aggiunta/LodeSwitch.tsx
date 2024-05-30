import React from 'react';
import { Switch } from 'react-native-paper';
import styled from 'styled-components/native';

interface LodeSwitchProps {
  voto: number;
  lode: boolean;
  setLode: (value: boolean) => void;
}

const LodeSwitch: React.FC<LodeSwitchProps> = ({ voto, lode, setLode }) => {
  const onLodeSwitch = () => setLode(!lode);

  if (voto !== 30) return null;

  return (
    <SwitchContainer>
      <Label>LODE:</Label>
      <StyledSwitch value={lode} onValueChange={onLodeSwitch} />
    </SwitchContainer>
  );
};

const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`;

const StyledSwitch = styled(Switch)`
  transform: scale(1.2);

  margin: 0 3%;
`;

const Label = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-right: 10px;
`;

export default LodeSwitch;
