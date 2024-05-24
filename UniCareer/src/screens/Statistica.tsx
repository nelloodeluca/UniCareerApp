import { View, ScrollView } from 'react-native';
import React from 'react';
import CardStatistica from '../components/CardStatistica';
import CardStatistica2 from '../components/CardStatistica2';
import styled from 'styled-components/native';

const ScrollViewContent = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function Statistica() {
  return (
    <ScrollView>
      <CardStatistica />
      <CardStatistica />
      <CardStatistica2 />
      <CardStatistica2 />
      <CardStatistica2 />
      <CardStatistica2 />
      <CardStatistica />
      <CardStatistica />
      <CardStatistica />
      <CardStatistica />
    </ScrollView>
  );
}
