import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import styled from 'styled-components/native';

const screenWidth = Dimensions.get('window').width;

const Container = styled(View)`
  
  padding: 16px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const data = {
  labels: [],
  datasets: [
    {
      data: [18, 25, 28, 30, 27, 24, 30, 22],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const StatisticaGrafico = () => {
  return (
    <Container>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
      />
    </Container>
  );
};

export default StatisticaGrafico;
