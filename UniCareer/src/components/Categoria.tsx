import React, { useState } from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Esame } from '../types';

const ModalContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
    width: 80%;
    padding: 16px;
    background-color: white;
    border-radius: 8px;
    align-items: center;
`;

const Input = styled.TextInput`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 8px;
`;

const Button = styled.TouchableOpacity`
    background-color: #3b82f6;
    padding: 8px 16px;
    border-radius: 4px;
    align-items: center;
    margin-top: 8px;
`;

const ButtonText = styled.Text`
    color: white;
`;

interface CategoriaProps {
  esame: Esame | null;
  closeModal: () => void;
  categories: string[];
  addCategory: (category: string) => void;
  assignCategory: (category: string) => void;
}

const Categoria: React.FC<CategoriaProps> = ({ esame, closeModal, categories, addCategory, assignCategory }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Text>{esame?.nome}</Text>
        <Text>CFU: {esame?.cfu}</Text>
        <Text>Data: {esame?.data}</Text>
        <Text>Categoria: {esame?.categoria}</Text>
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => assignCategory(item)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Input
          value={newCategory}
          onChangeText={setNewCategory}
          placeholder="Add new category"
        />
        <Button onPress={handleAddCategory}>
          <ButtonText>Add Category</ButtonText>
        </Button>
        <Button onPress={closeModal} style={{ marginTop: 8, backgroundColor: '#ccc' }}>
          <ButtonText>Close</ButtonText>
        </Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default Categoria;
