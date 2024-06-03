import React from 'react';
import { IconButton } from 'react-native-paper';
import styled from 'styled-components/native';
import { Categoria } from '../../types';

interface CategoryCardProps {
  categoria: Categoria;
  onModify: (id: string) => void;
  onDelete: (id: string) => void;
}

const CategoryCardContainer = styled.View`
  width:100%;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  elevation: 4;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Circle = styled.View<{ color: string }>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  margin-right: 8px;
`;

const CategoryName = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CategoriaCard: React.FC<CategoryCardProps> = ({
  categoria,
  onModify,
  onDelete,
}) => {
  return (
    <CategoryCardContainer>
      <Row>
        <CategoryName>{categoria.nome}</CategoryName>
        <Circle color={categoria.colore} />
        <ButtonContainer>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => onModify(categoria.id)}
          />
          <IconButton
            icon="delete"
            size={20}
            onPress={() => onDelete(categoria.id)}
          />
        </ButtonContainer>
      </Row>
    </CategoryCardContainer>
  );
};

export default CategoriaCard;
