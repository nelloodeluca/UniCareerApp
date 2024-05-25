import React from 'react';
import { View } from 'react-native';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { Circle, G, Line } from 'react-native-svg';
import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1;
  padding: 16px;
  flex-direction: column;
`;

const ChartContainer = styled(View)`
  height: 300px;
  flex-direction: row;
`;

const GraphContainer = styled(View)`
  flex: 1;
  margin-left: 10px;
`;

const StatisticaGrafico: React.FC = () => {
  // Esempio di dati, sostituire con i tuoi dati reali
  const voti = [18, 25, 28, 30, 27, 24, 30];
  const media = voti.map(
    (_, index, arr) =>
      arr.slice(0, index + 1).reduce((acc, curr) => acc + curr, 0) / (index + 1)
  );

  const data = [
    {
      data: voti,
      svg: { stroke: 'rgb(134, 65, 244)' },
    },
    {
      data: media,
      svg: { stroke: 'rgb(244, 65, 134)' },
    },
  ];

  return (
    <Container>
      <ChartContainer>
        <YAxis
          data={voti}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}`}
        />
        <GraphContainer>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{
              strokeWidth: 2,
              stroke: 'rgb(134, 65, 244)',
            }}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: 30 }}
            data={voti}
            formatLabel={(value, index) => index + 1}
            contentInset={{ left: 10, right: 10 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </GraphContainer>
      </ChartContainer>
    </Container>
  );
};

export default StatisticaGrafico;
