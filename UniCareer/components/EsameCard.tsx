import React from 'react';
import { Button, Card, Text } from 'react-native-paper';

interface EsameCardProps {
  item: {
    id: string;
    nome: string;
    cfu: number;
    data: string;
    categoria: string;
  };
}

function EsameCard({ item }: EsameCardProps) {
  return (
    <Card className="mb-4 w-full bg-white shadow-md rounded-lg">
      <Card.Title title="Card Title" subtitle="Card Subtitle"/>
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
    </Card>
  );
}

export default EsameCard;
