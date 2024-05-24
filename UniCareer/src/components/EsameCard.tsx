import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card as PaperCard, Badge as PaperBadge } from 'react-native-paper';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Esame {
  id: string;
  nome: string;
  cfu: number;
  data: string;
  categoria: string;
}

interface EsameCardProps {
  item: Esame;
}

type RootStackParamList = {
  EsameDettagli: { esame: Esame };
};

const Card = styled(PaperCard)`
  margin-bottom: 16px;
  width: 100%;
  background-color: white;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
  border-radius: 8px;
`;

const CardContent = styled.View`
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const InfoText = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const Badge = styled(PaperBadge)<{ categoria: string }>`
  background-color: ${(props) =>
    props.categoria === 'colorato' ? '#3b82f6' : '#e5e7eb'};
  color: ${(props) => (props.categoria === 'colorato' ? 'white' : '#6b7280')};
`;

function EsameCard({ item }: EsameCardProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EsameDettagli', { esame: item })}
    >
      <Card>
        <CardContent>
          <Title>{item.nome}</Title>
          <InfoText>CFU: {item.cfu}</InfoText>
          <InfoText>Data: {item.data}</InfoText>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InfoText style={{ marginRight: 8 }}>Categoria:</InfoText>
            <Badge categoria={item.categoria}>
              {item.categoria === 'colorato' ? 'Colorato' : 'Vuoto'}
            </Badge>
          </View>
        </CardContent>
      </Card>
    </TouchableOpacity>
  );
}

export default EsameCard;
