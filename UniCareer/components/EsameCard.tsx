import React from 'react';
import { View, Text } from 'react-native';
import { Card, Badge } from 'react-native-paper';

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
      
    </Card>
  );
}

export default EsameCard;
