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


const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

interface StatisticaGraficoProps {
  grades?: any;
}

const StatisticaGrafico = ({ grades }: StatisticaGraficoProps) => {

  const data = {
    labels: [],
    datasets: [
      {
        data: grades,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
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
