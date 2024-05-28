import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Chip, Text } from 'react-native-paper';
import { Categoria } from '../../types';

type CategoriaPickerProps = {
  categorie: Categoria[];
  onSelect: (selectedCategorie: Categoria[]) => void;
};

const CategoriaPicker: React.FC<CategoriaPickerProps> = ({ categorie, onSelect }) => {
  const [selectedCategorie, setSelectedCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    onSelect(selectedCategorie);
  }, [selectedCategorie]);

  const handleSelect = (category: Categoria) => {
    if (selectedCategorie.some((cat) => cat.id === category.id)) {
      setSelectedCategories(selectedCategorie.filter((cat) => cat.id !== category.id));
    } else if (selectedCategorie.length < 3) {
      setSelectedCategories([...selectedCategorie, category]);
    }
  };

  return (
    <ChipContainer>
      {categorie.map((categoria, index) => (
        <Chip
          key={categoria.id}
          selected={selectedCategorie.some((cat) => cat.id === categoria.id)}
          onPress={() => handleSelect(categoria)}
          style={{
            backgroundColor: categoria.colore,
            marginRight: 4,
            marginBottom: 4,
          }}
        >
          {categoria.nome}
        </Chip>
      ))}
    </ChipContainer>
  );
};

const ChipContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 8px;
`;

const Label = styled(Text)`
    font-size: 18px;
    margin: 4px 0;
    color: #333;
`;

export default CategoriaPicker;
