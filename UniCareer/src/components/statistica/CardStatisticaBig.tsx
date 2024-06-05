import React from 'react';
import { Text, Card, ProgressBar } from 'react-native-paper';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Titolo = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Barra = styled(ProgressBar)`
  height: 100%;
  background-color: #d6c9ff;
`;

const StyledCard = styled(Card)`
  width: 100%;
  margin: 6px auto;
  background-color: #fafafa;
  padding: 0 8px 0 8px;
`;

const ProgressBarContainer = styled(View)`
  position: relative;
  height: 20px;
  margin: 10px 0;
  justify-content: center;
`;

const ProgressText = styled(Text)`
  position: absolute;
  font-weight: bold;
  width: 100%;
  text-align: center;
  color: #d6c9ff;
  font-size: 12px;
  z-index: 1;
`;

type StatCardProps = {
  title: string;
  text: string;
  value1: number;
  value2: number;
};

const CardStatisticaBig: React.FC<StatCardProps> = ({
  title,
  text,
  value1,
  value2,
}) => {
  const rapporto = value1 / value2;

  return (
    <>
      <StyledCard>
        <Card.Content style={{ marginBottom: 8, marginTop: 8 }}>
          <Titolo>
            {value1} / {value2} {text}
          </Titolo>
          <ProgressBarContainer>
            <Barra progress={rapporto} color={'#6854a4'} />
            <ProgressText>{`${Math.round(rapporto * 100)}%`}</ProgressText>
          </ProgressBarContainer>
        </Card.Content>
      </StyledCard>
    </>
  );
};

export default CardStatisticaBig;
